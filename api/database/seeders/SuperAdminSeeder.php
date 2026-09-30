<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::firstOrCreate([
            'name' => 'super-admin',
        ]);

        $user = User::firstOrNew([
            'email' => 'admin@academy.com',
        ]);

        if (! $user->exists) {
            $user->first_name = 'Admin';
            $user->surname = 'User';
            $user->password = 'Testing99!';
            $user->save();
        }

        $user->roles()->syncWithoutDetaching($role);
    }
}
