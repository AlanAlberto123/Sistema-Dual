<?php
namespace App\Contracts\Auth;
use App\Models\User;
interface TokenIssuer {
    public function issue(User $user, array $abilities, ?string $name = 'api'): string;
}