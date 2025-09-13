<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coordinator extends Model
{
    protected $table = 'coordinators';

    protected $fillable = [
        'Nombre',
        'Apellidos',
        'Telefono',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
