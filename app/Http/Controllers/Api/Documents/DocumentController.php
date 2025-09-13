<?php

class DocumentController extends Controller
{
  public function download(Request $request, Document $document)
  {
    $this->authorize('download', $document); // Policy (opcional pero recomendado). :contentReference[oaicite:4]{index=4}

    // URL temporal firmada (expira en 10 min). Requiere 'serve' => true en el disk local.
    $url = Storage::disk('local')->temporaryUrl($document->path, now()->addMinutes(10));
    return response()->json(['url' => $url]);
  }
}