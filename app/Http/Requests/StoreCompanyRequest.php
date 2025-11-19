<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The company name field is required.',
            'name.string' => 'The company name field must be a valid string.',
            'name.max' => 'The company name field must not be greater than :max characters.',

            'description.string' => 'The company description field must be valid string.',

            'email.required' => 'The company email field is required.',
            'email.email' => 'The company email field must be a valid email address.',

            'phone.string' => 'The company phone field must be a valid string.',
            'phone.max' => 'The company phone field must not be greater than :max characters.',
        ];
    }
}
