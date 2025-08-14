<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Update the authenticated student's contact information.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'Direccion' => 'nullable|string',
            'Telefono' => 'nullable|numeric',
            'Correo_institucional' => 'nullable|email',
        ]);

        $student = $request->user()->student;
        $student->update($data);

        return response()->json($student);
    }
}