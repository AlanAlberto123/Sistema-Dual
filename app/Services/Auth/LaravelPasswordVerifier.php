<?php
namespace App\Services\Auth;
use App\Contracts\Auth\PasswordVerifier;
use Illuminate\Support\Facades\Hash;

class LaravelPasswordVerifier implements PasswordVerifier {
    public function verify(string $plain, string $hashed): bool { return Hash::check($plain, $hashed); }
}