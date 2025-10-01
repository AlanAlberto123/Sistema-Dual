<?php
namespace App\Contracts\Auth;

interface LoginService {
    /** @return array{token:string, abilities:array<string>, user:\App\Models\User} */
    public function login(array $credentials): array;
}