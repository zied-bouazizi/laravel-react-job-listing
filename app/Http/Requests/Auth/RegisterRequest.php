<?php

namespace App\Http\Requests\Auth;

use App\Helpers\RequestHelper;
use App\Http\Requests\StoreCompanyRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $companyRules = RequestHelper::prefixArrayKeys(
            (new StoreCompanyRequest())->rules(),
            'company'
        );

        return [
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->numbers()->symbols()],

            ...$companyRules,
        ];
    }

    public function messages(): array
    {
        return RequestHelper::prefixArrayKeys(
            (new StoreCompanyRequest())->messages(),
            'company'
        );
    }
}
