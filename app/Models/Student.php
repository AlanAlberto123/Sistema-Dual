<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'Nombre',
        'Apellidos',
        'No_control',
        'Semestre',
        'Direccion',
        'Telefono',
        'Correo_institucional',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}