<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;
use App\Models\Topic;

class Forum extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function modifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'modified_by');
    }
    /**
     * Get the topics for the forum.
     */
    public function topics(): HasMany
    {
        return $this->hasMany(Topic::class, 'forum_id');
    }

}
