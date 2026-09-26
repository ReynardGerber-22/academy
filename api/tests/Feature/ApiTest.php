<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_health_endpoint_returns_json(): void
    {
        $this->getJson('/api/health')->assertOk()->assertExactJson(['status' => 'ok']);
    }

    public function test_user_endpoint_rejects_guests_with_json(): void
    {
        $this->get('/api/user')->assertUnauthorized()->assertJson(['message' => 'Unauthenticated.']);
    }

    public function test_user_endpoint_returns_authenticated_user_without_password(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->getJson('/api/user')
            ->assertOk()
            ->assertJsonPath('id', $user->id)
            ->assertJsonMissingPath('password');
    }

    public function test_container_health_endpoint_is_available(): void
    {
        $this->get('/up')->assertOk();
    }

    public function test_super_admin_can_list_users_with_role_names(): void
    {
        $admin = User::factory()->create();
        $role = Role::create(['name' => 'super-admin']);
        $admin->roles()->attach($role);
        $user = User::factory()->create();
        $user->roles()->attach(Role::create(['name' => 'student']));
        Sanctum::actingAs($admin);

        $this->getJson('/api/admin/users')
            ->assertOk()
            ->assertJsonPath('0.id', $admin->id)
            ->assertJsonPath('0.roles.0', 'super-admin')
            ->assertJsonMissingPath('0.password');
    }

    public function test_student_is_forbidden_from_listing_users(): void
    {
        $student = User::factory()->create();
        $student->roles()->attach(Role::create(['name' => 'student']));
        Sanctum::actingAs($student);

        $this->getJson('/api/admin/users')
            ->assertForbidden()
            ->assertJson(['message' => 'Forbidden.']);
    }

    public function test_guests_are_rejected_from_listing_users(): void
    {
        $this->getJson('/api/admin/users')->assertUnauthorized();
    }

    public function test_super_admin_can_retrieve_an_individual_user(): void
    {
        $admin = User::factory()->create();
        $role = Role::create(['name' => 'super-admin']);
        $admin->roles()->attach($role);
        $user = User::factory()->create();
        $user->roles()->attach(Role::create(['name' => 'student']));
        Sanctum::actingAs($admin);

        $this->getJson("/api/admin/users/{$user->id}")
            ->assertOk()
            ->assertJsonPath('id', $user->id)
            ->assertJsonPath('roles.0', 'student')
            ->assertJsonMissingPath('password')
            ->assertJsonMissingPath('roles.0.pivot');
    }

    public function test_student_is_forbidden_from_retrieving_an_individual_user(): void
    {
        $student = User::factory()->create();
        $student->roles()->attach(Role::create(['name' => 'student']));
        Sanctum::actingAs($student);

        $this->getJson('/api/admin/users/1')->assertForbidden();
    }

    public function test_guests_are_rejected_from_retrieving_an_individual_user(): void
    {
        $this->getJson('/api/admin/users/1')->assertUnauthorized();
    }

    public function test_super_admin_gets_not_found_for_missing_user(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        Sanctum::actingAs($admin);

        $this->getJson('/api/admin/users/999999')->assertNotFound();
    }

    public function test_super_admin_can_update_a_users_name_and_email(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        $user = User::factory()->create();
        Sanctum::actingAs($admin);

        $this->patchJson("/api/admin/users/{$user->id}", [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
        ])
            ->assertOk()
            ->assertJsonPath('id', $user->id)
            ->assertJsonPath('name', 'Updated User')
            ->assertJsonPath('email', 'updated@example.com')
            ->assertJsonMissingPath('password');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated User',
            'email' => 'updated@example.com',
        ]);
    }

    public function test_student_is_forbidden_from_updating_a_user(): void
    {
        $student = User::factory()->create();
        $student->roles()->attach(Role::create(['name' => 'student']));
        $user = User::factory()->create();
        Sanctum::actingAs($student);

        $this->patchJson("/api/admin/users/{$user->id}", [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
        ])->assertForbidden();
    }

    public function test_guests_are_rejected_from_updating_a_user(): void
    {
        $user = User::factory()->create();

        $this->patchJson("/api/admin/users/{$user->id}", [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
        ])->assertUnauthorized();
    }

    public function test_super_admin_gets_not_found_when_updating_a_missing_user(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        Sanctum::actingAs($admin);

        $this->patchJson('/api/admin/users/999999', [
            'name' => 'Updated User',
            'email' => 'updated@example.com',
        ])->assertNotFound();
    }

    public function test_duplicate_email_is_rejected_when_updating_a_user(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        $existingUser = User::factory()->create(['email' => 'existing@example.com']);
        $user = User::factory()->create();
        Sanctum::actingAs($admin);

        $this->patchJson("/api/admin/users/{$user->id}", [
            'name' => 'Updated User',
            'email' => $existingUser->email,
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);
    }

    public function test_user_can_keep_their_existing_email_when_updating(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        $user = User::factory()->create(['email' => 'current@example.com']);
        Sanctum::actingAs($admin);

        $this->patchJson("/api/admin/users/{$user->id}", [
            'name' => 'Updated User',
            'email' => $user->email,
        ])
            ->assertOk()
            ->assertJsonPath('email', 'current@example.com');
    }

    public function test_super_admin_can_retrieve_available_roles(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        Role::create(['name' => 'student']);
        Role::create(['name' => 'administrator']);
        Sanctum::actingAs($admin);

        $this->getJson('/api/admin/roles')
            ->assertOk()
            ->assertJsonPath('0.name', 'administrator')
            ->assertJsonPath('1.name', 'student')
            ->assertJsonMissingPath('0.created_at');
    }

    public function test_student_cannot_retrieve_available_roles(): void
    {
        $student = User::factory()->create();
        $student->roles()->attach(Role::create(['name' => 'student']));
        Sanctum::actingAs($student);

        $this->getJson('/api/admin/roles')->assertForbidden();
    }

    public function test_guest_cannot_retrieve_available_roles(): void
    {
        $this->getJson('/api/admin/roles')->assertUnauthorized();
    }

    public function test_super_admin_can_update_another_users_roles(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        $studentRole = Role::create(['name' => 'student']);
        $tutorRole = Role::create(['name' => 'tutor']);
        $user = User::factory()->create();
        $user->roles()->attach($studentRole);
        Sanctum::actingAs($admin);

        $this->patchJson("/api/admin/users/{$user->id}/roles", [
            'roles' => [$tutorRole->id],
        ])
            ->assertOk()
            ->assertJsonPath('roles.0', 'tutor');
    }

    public function test_role_sync_removes_deselected_roles(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        $studentRole = Role::create(['name' => 'student']);
        $tutorRole = Role::create(['name' => 'tutor']);
        $user = User::factory()->create();
        $user->roles()->attach([$studentRole->id, $tutorRole->id]);
        Sanctum::actingAs($admin);

        $this->patchJson("/api/admin/users/{$user->id}/roles", [
            'roles' => [$studentRole->id],
        ])->assertOk();

        $this->assertTrue($user->fresh()->hasRole('student'));
        $this->assertFalse($user->fresh()->hasRole('tutor'));
    }

    public function test_invalid_role_ids_are_rejected(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        Sanctum::actingAs($admin);

        $this->patchJson('/api/admin/users/'.$admin->id.'/roles', [
            'roles' => [999999],
        ])->assertUnprocessable()->assertJsonValidationErrors(['roles.0']);
    }

    public function test_duplicate_role_ids_are_rejected(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        $studentRole = Role::create(['name' => 'student']);
        Sanctum::actingAs($admin);

        $this->patchJson('/api/admin/users/'.$admin->id.'/roles', [
            'roles' => [$studentRole->id, $studentRole->id],
        ])->assertUnprocessable()->assertJsonValidationErrors(['roles.1']);
    }

    public function test_student_cannot_update_roles(): void
    {
        $student = User::factory()->create();
        $student->roles()->attach(Role::create(['name' => 'student']));
        $user = User::factory()->create();
        Sanctum::actingAs($student);

        $this->patchJson("/api/admin/users/{$user->id}/roles", [
            'roles' => [],
        ])->assertForbidden();
    }

    public function test_guest_cannot_update_roles(): void
    {
        $user = User::factory()->create();

        $this->patchJson("/api/admin/users/{$user->id}/roles", [
            'roles' => [],
        ])->assertUnauthorized();
    }

    public function test_missing_user_returns_not_found_when_updating_roles(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::create(['name' => 'super-admin']));
        Sanctum::actingAs($admin);

        $this->patchJson('/api/admin/users/999999/roles', [
            'roles' => [],
        ])->assertNotFound();
    }

    public function test_super_admin_cannot_remove_super_admin_from_their_own_account(): void
    {
        $admin = User::factory()->create();
        $superAdminRole = Role::create(['name' => 'super-admin']);
        $studentRole = Role::create(['name' => 'student']);
        $admin->roles()->attach([$superAdminRole->id, $studentRole->id]);
        Sanctum::actingAs($admin);

        $this->patchJson("/api/admin/users/{$admin->id}/roles", [
            'roles' => [$studentRole->id],
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['roles']);

        $this->assertTrue($admin->fresh()->hasRole('super-admin'));
    }
}
