<?php

class CoordinatorDocumentController extends Controller
{
  public function index(Request $request)
  {
    $q = Document::with(['student.user'])->where('status','pending')->latest();
    if ($type = $request->query('type')) $q->where('type',$type);
    return $q->paginate(20);
  }

  public function review(Request $request, Document $document)
  {
    $data = $request->validate([
      'status' => ['required','in:approved,rejected'],
      'review_comment' => ['nullable','string','max:2000'],
    ]);

    $document->update([
      'status'        => $data['status'],
      'review_comment'=> $data['review_comment'] ?? null,
      'reviewed_by'   => $request->user()->id,
      'reviewed_at'   => now(),
    ]);

    return response()->json($document->fresh('reviewer'));
  }
}