<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AdminUserController extends Controller
{
    use AuthorizesRequests;

    public function index(): JsonResponse
    {
        $this->authorize('viewAny', User::class);
        $users = User::query()
            ->with('roles:id,name')
            ->get(['id', 'first_name', 'surname', 'email', 'created_at'])
            ->map(fn (User $user): array => $this->adminUserData($user));

        return response()->json($users);
    }

    public function roles(): JsonResponse
    {
        $this->authorize('viewAny', User::class);

        return response()->json(
            Role::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        );
    }

    public function show(User $user): JsonResponse
    {
        $this->authorize('view', $user);
        $user->load('roles:id,name');

        return response()->json($this->adminUserData($user));
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $this->authorize('update', $user);
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
        ]);

        $user->update($validated);
        $user->load('roles:id,name');

        return response()->json($this->adminUserData($user));
    }

    public function updateRoles(Request $request, User $user): JsonResponse
    {
        $this->authorize('manageRoles', $user);
        $validated = $request->validate([
            'roles' => ['required', 'array', 'min:0'],
            'roles.*' => ['integer', 'distinct', 'exists:roles,id'],
        ]);

        $roleIds = $validated['roles'];
        $superAdminRoleId = Role::where('name', 'super-admin')->value('id');
        $isSelfSuperAdmin = $request->user()?->is($user)
            && $user->hasRole('super-admin');

        if ($isSelfSuperAdmin && ! in_array($superAdminRoleId, $roleIds, true)) {
            throw ValidationException::withMessages([
                'roles' => ['You cannot remove the super-admin role from your own account.'],
            ]);
        }

        $user->roles()->sync($roleIds);
        $user->load('roles:id,name');

        return response()->json($this->adminUserData($user));
    }

    private function adminUserData(User $user): array
    {
        return [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'surname' => $user->surname,
            'email' => $user->email,
            'roles' => $user->roles->pluck('name')->values(),
            'created_at' => $user->created_at,
        ];
    }

    public function destroy(User $user, Request $request): JsonResponse
    {
        $isSelf = $request->user()?->is($user);
        if ($isSelf) {
            throw ValidationException::withMessages([
                'user' => ['You cannot delete your own account.'],
            ]);
        }
        $this->authorize('delete', $user);
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully.',
        ]);
    }
}
