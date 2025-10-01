<?php
namespace App\Http\Requests\Auth;
use Illuminate\Foundation\Http\FormRequest;

class LoginCoordinatorRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'email'    => ['required','email','max:255'],
            'password' => ['required','string','min:4'],
        ];
    }
}