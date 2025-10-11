<?php
namespace App\Services\Auth;

use App\Contracts\Auth\LoginService;
use App\Contracts\Auth\PasswordVerifier;
use App\Contracts\Auth\TokenIssuer;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;

class AdminLogin implements LoginService
{
    public function __construct(
        private PasswordVerifier $passwords,
        private TokenIssuer $tokens,
    ) {}

    public function login(array $credentials): array
    {
        $email = mb_strtolower(trim((string)($credentials['email'] ?? '')));
        $plain = (string)($credentials['password'] ?? '');

        if ($email === '' || $plain === '') {
            throw new HttpResponseException(
                response()->json(['message' => 'Faltan credenciales'], 422)
            );
        }

        // 1) Busca al usuario por email (case-insensitive) y carga perfil admin
        $user = User::whereRaw('LOWER(email) = ?', [$email])
            ->with('admin')
            ->first();

        if (!$user) {
            // Puedes usar 401 si prefieres "no autorizado"
            throw new HttpResponseException(
                response()->json(['message' => 'Credenciales inválidas'], 422)
            );
        }

        // 2) Verifica password
        if (!$this->passwords->verify($plain, $user->password)) {
            throw new HttpResponseException(
                response()->json(['message' => 'Credenciales inválidas'], 422)
            );
        }

        // 3) Debe existir relación admin (no coordinator)
        $admin = $user->admin;
        if (!$admin) {
            throw new HttpResponseException(
                response()->json(['message' => 'Administrador no encontrado'], 404)
            );
        }

        // 4) Emite token con ability "admin"
        $abilities = ['admin'];
        $token = $this->tokens->issue($user, $abilities, 'admin');

        // 5) Respuesta (asegúrate que el front lea 'access_token' o cambia a 'token')
        return [
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'abilities'    => $abilities,
            'user'         => $user->only(['id','name','email']),
            'admin'        => $admin,
        ];
    }
}