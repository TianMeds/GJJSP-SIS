<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RenewalDocumentRequest extends FormRequest
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
        if(request()->isMethod('post')) {
            return [
                'gwa_value' => 'required|numeric',
                'gwa_remarks' => 'required|string',
                'copyOfReportCard' => 'required|image|file|mimes:pdf,doc,docx|max:2048',
                'copyOfRegistrationForm' => 'required|file|mimes:pdf,doc,docx|max:2048',
                'scannedWrittenEssay' => 'required|file|mimes:pdf,doc,docx|max:2048',
                'letterOfGratitude' => 'required|file|mimes:pdf,doc,docx|max:2048',
            ];
        }
        else{
            return [
                'gwa_value' => 'required|numeric',
                'gwa_remarks' => 'required|string',
                'copyOfReportCard' => 'required|image|file|mimes:pdf,doc,docx|max:2048',
                'copyOfRegistrationForm' => 'required|file|mimes:pdf,doc,docx|max:2048',
                'scannedWrittenEssay' => 'required|file|mimes:pdf,doc,docx|max:2048',
                'letterOfGratitude' => 'required|file|mimes:pdf,doc,docx|max:2048',
            ];
        }
    }

    public function messages()
    {
        if(request()->isMethod('post')){
            return [
                'gwa_value.required' => 'GWA value is required',
                'gwa_remarks.required' => 'GWA remarks is required',
                'copyOfReportCard.required' => 'Copy of report card is required',
                'copyOfRegistrationForm.required' => 'Copy of registration form is required',
                'scannedWrittenEssay.required' => 'Scanned written essay is required',
                'letterOfGratitude.required' => 'Letter of gratitude is required',
            ];
        }
        else{
            return [
                'gwa_value.required' => 'GWA value is required',
                'gwa_remarks.required' => 'GWA remarks is required',
                'copyOfReportCard.required' => 'Copy of report card is required',
                'copyOfRegistrationForm.required' => 'Copy of registration form is required',
                'scannedWrittenEssay.required' => 'Scanned written essay is required',
                'letterOfGratitude.required' => 'Letter of gratitude is required',
            ];
        }
    }
}
