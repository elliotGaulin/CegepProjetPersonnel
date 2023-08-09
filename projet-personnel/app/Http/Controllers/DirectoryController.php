<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
/**
 * Controlleur pour les dossierss
 */
class DirectoryController extends Controller
{
    /**
     * Crée un nouveau dossiers
     *
     * @param Request $request
     * @return JSONResponse $response Le dossier créé
     */
    public function store(Request $request)
    {
        $request->validate([
            'directory' => 'required|string',
            'parent_id' => 'nullable|integer|exists:files,id',
        ]);

        $user = $request->user();

        $file = $user->files()->create([
            'filename' => $request->directory,
            'filesize' => 0,
            'is_directory' => true,
            'parent_id' => $request->parent_id,
        ]);

        return response()->json([
            'file' => $file,
        ]);
    }


    /**
     * Montre les fichiers d'un dossiers
     *
     * @param Request $request
     * @param [type] $id Le id du dossier
     * @return JSONResponse $response Les fichiers du dossier
     */
    public function show(Request $request, $id = null)
    {
        if (is_null($id)) {
            $files = $request->user()->files()->whereNull('parent_id')->orderBy('is_directory', 'desc')->orderBy('filename')->get();
        } else {
            $dir = $request->user()->files()->find($id);
            if (is_null($dir)) {
                return response()->json([
                    'message' => 'Dossier introuvable.',
                ], 404);
            } else if (!$dir->is_directory) {
                return response()->json([
                    'message' => 'Impossible de lister les fichiers d\'un fichier.',
                ], 400);
            }

            $files = $dir->files()->orderBy('is_directory', 'desc')->orderBy('filename')->get();
        }

        return response()->json([
            'files' => $files,
        ]);
    }
}
