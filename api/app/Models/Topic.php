<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Reply;
use App\Models\User;
use App\Models\Forum;

class Topic extends Model
{
    protected $fillable = [
        'forum_id',
        'subject',
        'body',
    ];

    public function forum(): BelongsTo
    {
        return $this->belongsTo(Forum::class, 'forum_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function modifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'modified_by');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Reply::class, 'topic_id');
    }
}
