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

        $legacyRole = Role::where('name', 'Admin')->first();
        if ($legacyRole && $legacyRole->isNot($role)) {
            $role->users()->syncWithoutDetaching($legacyRole->users()->pluck('users.id'));
            $legacyRole->users()->detach();
            $legacyRole->delete();
        }

        $studentRole = Role::whereRaw('LOWER(name) = ?', ['student'])->first();
        if (! $studentRole) {
            $studentRole = Role::create(['name' => 'student']);
        } elseif ($studentRole->name !== 'student') {
            $studentRole->name = 'student';
            $studentRole->save();
        }

        $user = User::firstOrNew([
            'email' => 'admin@academy.com',
        ]);

        if (! $user->exists) {
            $user->name = 'Admin';
            $user->password = 'Testing99!';
            $user->save();
        }

        $user->roles()->syncWithoutDetaching($role);
    }
}
