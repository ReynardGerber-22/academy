<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Forum;

class ForumController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $forums = Forum::all();
        return response()->json($forums);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Forum::class);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        $forum = Forum::create($validated);
        $forum->created_by = $request->user()->id;
        $forum->save();
        return response()->json($forum, 201);
    }
}
