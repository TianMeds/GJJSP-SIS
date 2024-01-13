<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PromptController extends Controller
{
    public function generate(Request $request)
    {
        $prompt = $request->input('prompt');

        // Your logic to process the prompt and generate a response
        $response = 'You said: ' . $prompt;

        return response()->json([
            'prompt' => $prompt,
            'response' => $response,
        ]);
    }
}
