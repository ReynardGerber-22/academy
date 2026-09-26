<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ImportUsersCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_dry_run_validates_without_writing_users_or_roles(): void
    {
        Role::create(['name' => 'student']);
        $path = $this->writeCsv("first_name,surname,email,password,roles,is_active\nAda,Lovelace,ada@example.com,Testing99!,student,1\n");

        try {
            $this->artisan('academy:import-users', [
                'path' => $path,
                '--dry-run' => true,
            ])
                ->expectsOutput('Dry run complete: 1 to create, 0 to update.')
                ->assertExitCode(0);

            $this->assertDatabaseMissing('users', ['email' => 'ada@example.com']);
        } finally {
            unlink($path);
        }
    }

    public function test_import_creates_user_and_syncs_roles(): void
    {
        $student = Role::create(['name' => 'student']);
        $tutor = Role::create(['name' => 'tutor']);
        $path = $this->writeCsv("first_name,surname,email,password,roles,is_active\nAda,Lovelace,ada@example.com,Testing99!,student|tutor,1\n");

        try {
            $this->artisan('academy:import-users', ['path' => $path])
                ->expectsOutput('Import complete: 1 to create, 0 to update.')
                ->assertExitCode(0);

            $user = User::where('email', 'ada@example.com')->firstOrFail();
            $this->assertSame('Ada', $user->first_name);
            $this->assertSame('Lovelace', $user->surname);
            $this->assertTrue($user->is_active);
            $this->assertEqualsCanonicalizing(
                [$student->id, $tutor->id],
                $user->roles()->pluck('roles.id')->all(),
            );
        } finally {
            unlink($path);
        }
    }

    public function test_import_rejects_unknown_roles_without_writing(): void
    {
        $path = $this->writeCsv("first_name,surname,email,password,roles\nAda,Lovelace,ada@example.com,Testing99!,unknown\n");

        try {
            $this->artisan('academy:import-users', ['path' => $path])
                ->assertExitCode(1);

            $this->assertDatabaseMissing('users', ['email' => 'ada@example.com']);
        } finally {
            unlink($path);
        }
    }

    private function writeCsv(string $contents): string
    {
        $path = tempnam(sys_get_temp_dir(), 'academy-users-');
        file_put_contents($path, $contents);

        return $path;
    }
}
