<?php

class StudentDocumentController extends Controller
{
  public function index(Request $request)
  {
    $student = $request->user()->student;   // asumiendo relación User->student
    return Document::where('student_id',$student->id)
      ->latest()->paginate(10);
  }

  public function store(Request $request)
  {
    $data = $request->validate([
      'type' => ['required','string','max:100'],
      'file' => ['required','file','mimes:pdf,jpg,jpeg,png,doc,docx','max:10240'], // 10MB
    ]); // Validación estándar Laravel. :contentReference[oaicite:3]{index=3}

    $student = $request->user()->student;
    $file = $data['file'];

    $path = $file->store("students/{$student->id}", 'local'); // privado

    $doc = Document::create([
      'student_id'    => $student->id,
      'type'          => $data['type'],
      'path'          => $path,
      'original_name' => $file->getClientOriginalName(),
      'mime'          => $file->getClientMimeType(),
      'size'          => $file->getSize(),
      'status'        => 'pending',
    ]);

    return response()->json($doc, 201);
  }
}