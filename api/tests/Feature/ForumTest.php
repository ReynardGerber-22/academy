<?php

namespace Tests\Feature;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Role;
use Laravel\Sanctum\Sanctum;

class ForumTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_create_a_forum(): void
    {
        $user = User::factory()->create();

        $role = Role::create(['name' => 'super-admin']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $this->post('/api/forums', [
                'title' => 'Test Forum',
                'description' => 'This is a test forum.',
            ])
            ->assertStatus(201);
    }
}
