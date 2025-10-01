<?php
namespace App\Contracts\Auth;
interface PasswordVerifier { public function verify(string $plain, string $hashed): bool; }