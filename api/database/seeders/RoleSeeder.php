<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's roles.
     */
    public function run(): void
    {
        $roles = [
            'administrator',
            'superuser',
            'course-admin',
            'enrolment-admin',
            'overseer',
            'training-manager',
            'tutor',
            'marker',
            'student',
            'authenticated-user',
            'anonymous-user',
            'elegy',
            'external-content-provider',
            'super-admin',
        ];

        foreach ($roles as $name) {
            Role::firstOrCreate(['name' => $name]);
        }
    }
}
