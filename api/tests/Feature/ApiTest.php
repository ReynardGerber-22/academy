<?php

namespace Tests\Feature;

use App\Models\User;
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
}
