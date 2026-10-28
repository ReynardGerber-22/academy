<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Role;
use Laravel\Sanctum\Sanctum;
use App\Models\Forum;

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
        $this->assertDatabaseHas('forums', [
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
    }

    public function test_student_cannot_create_a_forum(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'student']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $this->post('/api/forums', [
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ])
            ->assertStatus(403);
        $this->assertDatabaseMissing('forums', [
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
    }

    public function test_administrator_can_create_a_forum(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'administrator']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $this->post('/api/forums', [
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ])
            ->assertStatus(201);
        $this->assertDatabaseHas('forums', [
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
            'created_by' => $user->id,
        ]);
    }

    public function test_authenticated_user_can_view_forums(): void
    {
        $user = User::factory()->create();
        $forum = Forum::create([
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
        Sanctum::actingAs($user);
        $this->get('/api/forums')
            ->assertStatus(200)
            ->assertJsonFragment([
                'title' => $forum->title,
                'description' => $forum->description,
            ]);
    }
    public function test_unauthenticated_user_cannot_view_forums(): void
    {
        $this->get('/api/forums')
            ->assertStatus(401);
    }

    public function test_forum_requires_a_title(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'super-admin']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $this->post('/api/forums', [
            'description' => 'This is a test forum.',
        ])->assertStatus(422)->assertJsonValidationErrors(['title']);;
    }

    public function test_forum_requires_a_description(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'super-admin']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $this->post('/api/forums', [
            'title' => 'Test Forum',
        ])->assertStatus(422)->assertJsonValidationErrors(['description']);
        $this->assertDatabaseMissing('forums', [
            'title' => 'Test Forum',
        ]);
    }

    public function test_forum_title_cannot_exceed_255_characters(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'super-admin']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $this->post('/api/forums', [
            'title' => str_repeat('a', 256),
            'description' => 'This is a test forum.',
        ])->assertStatus(422)->assertJsonValidationErrors(['title']);
        $this->assertDatabaseMissing('forums', [
            'title' => str_repeat('a', 256),
        ]);
    }
    public function test_administrator_can_update_forum(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'administrator']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $forum = Forum::create([
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
        $this->patch("/api/forums/{$forum->id}", [
            'title' => 'Updated Forum',
            'description' => 'This is an updated test forum.',
        ])->assertStatus(200);
        $this->assertDatabaseHas('forums', [
            'id' => $forum->id,
            'title' => 'Updated Forum',
            'description' => 'This is an updated test forum.',
            'modified_by' => $user->id,
        ]);
    }
    public function test_student_cannot_update_forum(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'student']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $forum = Forum::create([
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
        $this->patch("/api/forums/{$forum->id}", [
            'title' => 'Updated Forum',
            'description' => 'This is an updated test forum.',
        ])->assertStatus(403);
        $this->assertDatabaseHas('forums', [
            'id' => $forum->id,
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
    }
    public function test_student_cannot_delete_forum(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'student']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $forum = Forum::create([
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
        $this->delete("/api/forums/{$forum->id}")
            ->assertStatus(403);
        $this->assertDatabaseHas('forums', [
            'id' => $forum->id,
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
    }
    public function test_administrator_can_delete_forum(): void
    {
        $user = User::factory()->create();
        $role = Role::create(['name' => 'administrator']);
        $user->roles()->attach($role);
        Sanctum::actingAs($user);
        $forum = Forum::create([
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
        $this->delete("/api/forums/{$forum->id}")
            ->assertStatus(204);
        $this->assertDatabaseMissing('forums', [
            'id' => $forum->id,
        ]);
    }
    public function test_authenticated_user_can_view_a_forum(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $forum = Forum::create([
            'title' => 'Test Forum',
            'description' => 'This is a test forum.',
        ]);
        $this->get("/api/forums/{$forum->id}")
            ->assertStatus(200)
            ->assertJson([
                'id' => $forum->id,
                'title' => 'Test Forum',
                'description' => 'This is a test forum.',
            ]);
    }
}
