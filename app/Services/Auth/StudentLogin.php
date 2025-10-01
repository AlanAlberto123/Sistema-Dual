<?php
namespace App\Services\Auth;
use App\Contracts\Auth\LoginService;
use App\Contracts\Auth\PasswordVerifier;
use App\Contracts\Auth\TokenIssuer;
use App\Models\Student;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StudentLogin implements LoginService
{
    public function __construct(
        private PasswordVerifier $passwords,
        private TokenIssuer $tokens,
    ) {}

    public function login(array $credentials): array
    {
        $no = trim((string)($credentials['no_control'] ?? ''));
        $student = Student::with('user')->where('no_control', $no)->first();

        if (!$student || !$student->user) {
            // 404 con mensaje claro
            throw new HttpResponseException(
                response()->json(['message' => 'Estudiante no encontrado'], 404)
            );
        }

        $user = $student->user;

        if (!$this->passwords->verify($credentials['password'] ?? '', $user->password)) {
            throw new HttpResponseException(
                response()->json(['message' => 'Credenciales inválidas'], 422)
            );
        }

        // En vez de roles, usamos abilities del token (Sanctum)
        $abilities = ['student'];
        $token = $this->tokens->issue($user, $abilities, 'student');

        // Devuelve lo que tu frontend espera
        return [
            'token'     => $token,               // o 'access_token' si prefieres ese nombre en todo el front
            'abilities' => $abilities,
            'user'      => $user->only(['id','name','email']),
            'student'   => $student,             // <-- clave para StudentsHome
        ];
    }
}