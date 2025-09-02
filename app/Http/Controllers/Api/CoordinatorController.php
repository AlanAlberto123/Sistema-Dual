<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CoordinatorController extends Controller
{
    /**
     * Update the authenticated coordinator's contact information.
     */
    public function update(Request $request)
    {
        $coordinator = $request->user()->coordinator;
        $coordinator->update($data);

        return response()->json($coordinator);
    }
}