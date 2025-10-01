<?php
namespace App\Http\Requests\Auth;
use Illuminate\Foundation\Http\FormRequest;

class LoginStudentRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'no_control' => ['required','string','max:50'],
            'password'   => ['required','string','min:4'],
        ];
    }
}