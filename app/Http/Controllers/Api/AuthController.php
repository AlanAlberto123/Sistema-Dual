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
        $data = $request->validate([
            'no_control' => ['required','numeric'],   // o numeric si tu columna lo es
            'password'   => ['required','string'],
        ]);

        $student = Student::with('user')->where('No_control', $data['no_control'])->first();
        if (! $student || ! $student->user) {
            throw ValidationException::withMessages(['no_control'=>['Credenciales incorrectas.']]);
        }

        $user = $student->user;
        if (! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['no_control'=>['Credenciales incorrectas.']]);
        }

        // SOLO estudiantes
        if ($user->role !== 'student') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $token = $user->createToken('student-token', ['student'])->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user'         => $user,
            'role'         => $user->role,
            'student'      => $student,
        ]);
    }

    public function loginCoordinator(Request $request)
{
    $data = $request->validate([
        'email'    => ['required','email'],
        'password' => ['required','string'],
    ]);

    $email = strtolower(trim($data['email']));
    $user = User::whereRaw('LOWER(email) = ?', [$email])
        ->with('coordinator')
        ->first();

    if (!$user || !Hash::check($data['password'], $user->password)) {
        throw ValidationException::withMessages(['email' => ['Credenciales inválidas.']]);
    }

    if ($user->role !== 'coordinator') {
        return response()->json(['error' => 'No autorizado'], 403);
    }

    $token = $user->createToken('coordinator-token', ['coordinator'])->plainTextToken;

    return response()->json([
        'access_token' => $token,
        'token_type'   => 'Bearer',
        'role'         => $user->role,
        'user'         => $user->only(['id','name','email','role']),
        'coordinator'  => $user->coordinator,
    ]);
}

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    }
}
