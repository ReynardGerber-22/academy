<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'name')) {
            return;
        }

        Schema::table('users', function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'first_name')) {
                $table->string('first_name')->default('');
            }

            if (! Schema::hasColumn('users', 'surname')) {
                $table->string('surname')->default('');
            }

            if (! Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true);
            }
        });

        DB::table('users')
            ->select(['id', 'name'])
            ->orderBy('id')
            ->chunkById(500, function ($users): void {
                foreach ($users as $user) {
                    $nameParts = preg_split('/\s+/', trim($user->name), 2) ?: [];

                    DB::table('users')
                        ->where('id', $user->id)
                        ->update([
                            'first_name' => $nameParts[0] ?? '',
                            'surname' => $nameParts[1] ?? '',
                        ]);
                }
            });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('users', 'name')) {
            return;
        }

        if (Schema::hasColumn('users', 'first_name') && Schema::hasColumn('users', 'surname')) {
            DB::table('users')->update([
                'name' => DB::raw("TRIM(CONCAT(first_name, ' ', surname))"),
            ]);
        }

        Schema::table('users', function (Blueprint $table): void {
            $columns = array_values(array_filter(
                ['first_name', 'surname', 'is_active'],
                fn (string $column): bool => Schema::hasColumn('users', $column),
            ));

            if ($columns !== []) {
                $table->dropColumn($columns);
            }
        });
    }
};