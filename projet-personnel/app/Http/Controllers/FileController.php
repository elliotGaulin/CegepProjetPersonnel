<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
        ]);

        $path = $request->file('file')->store('files');

        $file = $request->user()->files()->create([
            'filename' => $request->file('file')->getClientOriginalName(),
            'path' => $path,
        ]);

        return response()->json([
            'file' => $file,
        ]);
    }

    public function index(Request $request)
    {
        $files = $request->user()->files()->get();

        return response()->json([
            'files' => $files,
        ]);
    }

    public function show(Request $request, $id)
    {
        $file = $request->user()->files()->find($id);
        if(is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        }
        return response()->json([
            'file' => $file,
        ]);
    }

    public function download(Request $request, $id)
    {
        $file = $request->user()->files()->find($id);
        if(is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        }
        return response()->download(storage_path('app/' . $file->path), $file->filename);
    }

    public function destroy(Request $request, $id)
    {
        $file = $request->user()->files()->find($id);
        if(is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        }

        $file->delete();

        return response()->json([
            'message' => 'Fichier supprimé avec succès.',
        ]);
    }
}
