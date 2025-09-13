<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CoordinatorController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user()->load('coordinator');

        return response()->json([
            'user'        => $user->only(['id','name','email','role']),
            'coordinator' => $user->coordinator,
        ]);
    }

    public function update(Request $request)
    {
        $coordinator = $request->user()->coordinator;
        if (!$coordinator) {
            return response()->json(['message' => 'No existe perfil de coordinador.'], 404);
        }

        $data = $request->validate([
            'Nombre'    => ['sometimes','string','max:255'],
            'Apellidos' => ['sometimes','string','max:255'],
            'Telefono'  => ['sometimes','string','max:50'],
        ]);

        $coordinator->update($data);

        return response()->json($coordinator);
    }
}