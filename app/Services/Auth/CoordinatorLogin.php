<?php
namespace App\Services\Auth;
use App\Contracts\Auth\LoginService;
use App\Contracts\Auth\PasswordVerifier;
use App\Contracts\Auth\TokenIssuer;
use App\Models\User;
use App\Models\Coordinator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CoordinatorLogin implements LoginService
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

        // 1) Busca al usuario por email (case-insensitive)
        $user = User::whereRaw('LOWER(email) = ?', [$email])
            ->with('coordinator')
            ->first();

        if (!$user) {
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

        // 3) Debe existir relación coordinator
        $coordinator = $user->coordinator;
        if (!$coordinator) {
            throw new HttpResponseException(
                response()->json(['message' => 'Coordinador no encontrado'], 404)
            );
        }

        // 4) Emite token con ability "coordinator"
        $abilities = ['coordinator'];
        $token = $this->tokens->issue($user, $abilities, 'coordinator');

        // 5) Respuesta consistente con tu front
        return [
            'access_token' => $token,                     // <-- usa esta llave para el front
            'token_type'   => 'Bearer',
            'abilities'    => $abilities,
            'user'         => $user->only(['id','name','email']),
            'coordinator'  => $coordinator,
        ];
    }
}