<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

class ImportUsers extends Command
{
    protected $signature = 'academy:import-users
        {path : Path to the users CSV file}
        {--dry-run : Validate the file without writing to the database}
        {--ignore-role=* : Source role to ignore during import}';

    protected $description = 'Import Academy users and roles from a CSV file';

    public function handle(): int
    {
        $path = $this->argument('path');

        if (! is_readable($path)) {
            $this->error("CSV file is not readable: {$path}");

            return self::FAILURE;
        }

        try {
            $rows = $this->readRows($path);
            $roleIds = Role::query()->pluck('id', 'name');
            $ignoredRoles = $this->normalizedRoles($this->option('ignore-role'));
            $this->validateRows($rows, $roleIds, $ignoredRoles);
        } catch (RuntimeException $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        $dryRun = (bool) $this->option('dry-run');
        $created = 0;
        $updated = 0;

        if (! $dryRun) {
            DB::transaction(function () use ($rows, $roleIds, $ignoredRoles, &$created, &$updated): void {
                foreach ($rows as $row) {
                    $existing = User::query()->where('email', $row['email'])->first();
                    $user = $existing ?? new User;
                    $user->first_name = $row['first_name'];
                    $user->surname = $row['surname'];
                    $user->email = $row['email'];
                    if (! $existing) {
                        $user->password = $row['password'] ?: Str::random(64);
                    }
                    $user->is_active = $row['is_active'];
                    $user->save();
                    $user->roles()->sync(array_map(
                        fn (string $role): int => $roleIds[$role],
                        array_diff($row['roles'], $ignoredRoles),
                    ));

                    $existing ? $updated++ : $created++;
                }
            });
        } else {
            foreach ($rows as $row) {
                User::query()->where('email', $row['email'])->exists()
                    ? $updated++
                    : $created++;
            }
        }

        $prefix = $dryRun ? 'Dry run complete' : 'Import complete';
        $this->info("{$prefix}: {$created} to create, {$updated} to update.");

        return self::SUCCESS;
    }

    /** @return list<array{first_name: string, surname: string, email: string, password: string, is_active: bool, roles: list<string>}> */
    private function readRows(string $path): array
    {
        $file = new \SplFileObject($path);
        $file->setFlags(\SplFileObject::READ_CSV | \SplFileObject::SKIP_EMPTY | \SplFileObject::DROP_NEW_LINE);
        $headers = $file->fgetcsv();

        if ($headers === false || $headers === [null]) {
            throw new RuntimeException('CSV file is empty.');
        }

        $headers = array_map(fn (mixed $header): string => trim((string) $header), $headers);
        $required = ['first_name', 'surname', 'email', 'is_active', 'roles'];
        $missing = array_diff($required, $headers);

        if ($missing !== []) {
            throw new RuntimeException('Missing CSV columns: '.implode(', ', $missing));
        }

        $rows = [];
        $seenEmails = [];
        $line = 1;

        while (! $file->eof()) {
            $values = $file->fgetcsv();
            $line++;
            if ($values === [null] || $values === false) {
                continue;
            }

            $values = array_pad($values, count($headers), null);
            $row = array_combine($headers, array_slice($values, 0, count($headers)));
            $email = strtolower(trim((string) ($row['email'] ?? '')));
            $roles = array_values(array_filter(array_map(
                fn (string $role): string => str_replace([' ', '_'], '-', strtolower(trim($role))),
                explode('|', (string) ($row['roles'] ?? '')),
            )));

            if ($email === '' || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new RuntimeException("Line {$line}: invalid email.");
            }
            if (isset($seenEmails[$email])) {
                throw new RuntimeException("Line {$line}: duplicate email {$email}.");
            }

            $seenEmails[$email] = true;
            $rows[] = [
                'first_name' => trim((string) ($row['first_name'] ?? '')),
                'surname' => trim((string) ($row['surname'] ?? '')),
                'email' => $email,
                'password' => trim((string) ($row['password'] ?? '')),
                'is_active' => $this->parseBoolean($row['is_active'] ?? '1', $line),
                'roles' => $roles,
            ];
        }

        return $rows;
    }

    /** @param list<array{first_name: string, surname: string, email: string, password: string, is_active: bool, roles: list<string>}> $rows */
    private function validateRows(array $rows, $roleIds, array $ignoredRoles): void
    {
        foreach ($rows as $index => $row) {
            $line = $index + 2;
            foreach (['first_name', 'surname'] as $field) {
                if ($row[$field] === '') {
                    throw new RuntimeException("Line {$line}: {$field} is required.");
                }
            }

            $unknownRoles = array_diff($row['roles'], $roleIds->keys()->all(), $ignoredRoles);
            if ($unknownRoles !== []) {
                throw new RuntimeException("Line {$line}: unknown roles: ".implode(', ', $unknownRoles));
            }
        }
    }

    /** @param list<mixed> $roles */
    private function normalizedRoles(array $roles): array
    {
        return array_values(array_filter(array_map(
            fn (mixed $role): string => str_replace([' ', '_'], '-', strtolower(trim((string) $role))),
            $roles,
        )));
    }

    private function parseBoolean(mixed $value, int $line): bool
    {
        $parsed = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if ($parsed === null) {
            throw new RuntimeException("Line {$line}: is_active must be true, false, 1, or 0.");
        }

        return $parsed;
    }
}
