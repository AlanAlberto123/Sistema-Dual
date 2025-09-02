<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coordinator extends Model
{
    protected $fillable = [
        'Nombre',
        'Apellidos',
        'Telefono',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
