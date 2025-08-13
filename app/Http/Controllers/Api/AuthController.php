<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function loginStudent(Request $request)
{
    $request->validate([
        'no_control' => 'required|numeric',
        'password'   => 'required|string',
    ]);

    $student = Student::where('No_control', $request->no_control)->first();

    if (!$student) {
        throw ValidationException::withMessages([
            'no_control' => ['Credenciales incorrectas.']
        ]);
    }

    $user = $student->user;

    // Soporta contraseñas antiguas sin bcrypt y rehashea si coinciden
    $valid = false;
    try {
        $valid = Hash::check($request->password, $user->password);
    } catch (\RuntimeException $e) {
        // Por ejemplo: "This password does not use the Bcrypt algorithm."
        if ($request->password === $user->password) {
            $user->password = Hash::make($request->password);
            $user->save();
            $valid = true;
        }
    }

    if (!$valid) {
        throw ValidationException::withMessages([
            'no_control' => ['Credenciales incorrectas.']
        ]);
    }

    $token = $user->createToken('student-token')->plainTextToken;

    return response()->json([
        'access_token' => $token,
        'user' => $user,
        'rol'  => $student->user->rol,
    ]);
}

    public function loginCoordinator(Request $request){

        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('name', $request->name)->first();

        if (!$user || !Hash::check($request->password, $user->password)){
            throw ValidationException::withMessages([
               'name' => ['Credenciales invalidas.'],
            ]);
        }

        if ($user->rol != 'coordinator') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $token = $user->createToken('coordinator-token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user' => $user,
            'rol' => $user->rol,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Sesion cerrada']);
    }
}
