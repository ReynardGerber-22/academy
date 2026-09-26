<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::query()
            ->with('roles:id,name')
            ->get(['id', 'first_name', 'surname', 'email', 'created_at'])
            ->map(fn (User $user): array => $this->adminUserData($user));

        return response()->json($users);
    }

    public function roles(): JsonResponse
    {
        return response()->json(
            Role::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        );
    }

    public function show(User $user): JsonResponse
    {
        $user->load('roles:id,name');

        return response()->json($this->adminUserData($user));
    }

    public function update(Request $request, User $user): JsonResponse
    {
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
}
