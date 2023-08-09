<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Controlleur des fichiers.
 */
class FileController extends Controller
{
    const SUPPORTED_MIME_TYPES = [
        "application/json",
    ];

    /**
     * Enregistre un fichier.
     *
     * @param Request $request
     * @return JsonResponse Réponse JSON contenant le fichier enregistré.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
            'parent_id' => 'nullable|integer|exists:files,id',
        ]);

        //Check if parent_id is valid for the user
        if(!is_null($request->parent_id)) {
            $dir = File::where(['id' => $request->parent_id, 'user_id' => $request->user()->id, 'is_directory' => true])->first();
            if (is_null($dir)) {
                return response()->json([
                    'message' => 'Dossier introuvable.',
                ], 404);
            }
        }

        $path = $request->file('file')->store('files');

        Log::info(mime_content_type(storage_path('app/' . $path)));

        $file = $request->user()->files()->create([
            'filename' => $request->file('file')->getClientOriginalName(),
            'path' => $path,
            'filesize' => $request->file('file')->getSize(),
            "parent_id" => $request->parent_id,
            'is_directory' => false,
            'mime_type' => $request->file('file')->getMimeType(),
        ]);

        return response()->json([
            'file' => $file,
        ]);
    }

    /**
     * Liste les fichiers de l'utilisateur.
     *
     * @param Request $request
     * @return JsonResponse Réponse JSON contenant la liste des fichiers de l'utilisateur.
     */
    public function index(Request $request)
    {
        $files = $request->user()->files()->get();

        return response()->json([
            'files' => $files,
        ]);
    }

    /**
     * Affiche un fichier.
     *
     * @param Request $request
     * @param [type] $id le id du fichier à afficher
     * @return JsonResponse Réponse JSON contenant le fichier à afficher.
     */
    public function show(Request $request, $id)
    {
        $file = $request->user()->files()->find($id);
        if (is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        }
        return response()->json([
            'file' => $file,
        ]);
    }

    /**
     * Télécharge un fichier.
     *
     * @param Request $request
     * @param [type] $id le id du fichier à télécharger
     * @return BinaryFileResponse Réponse binaire contenant le fichier à télécharger.
     */
    public function download(Request $request, $id)
    {
        $file = $request->user()->files()->find($id);
        if (is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        } else if ($file->is_directory) {
            return response()->json([
                'message' => 'Impossible de télécharger un dossier.',
            ], 400);
        }
        return response()->download(storage_path('app/' . $file->path), $file->filename);
    }

    /**
     * Télécharge un fichier public.
     *
     * @param [type] $id le id du fichier à télécharger
     * @return BinaryFileResponse Réponse binaire contenant le fichier à télécharger.
     */
    public function publicDownload($id)
    {
        $file = File::find($id);
        if (is_null($file) || !$file->public) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        } else if ($file->is_directory) {
            return response()->json([
                'message' => 'Impossible de télécharger un dossier.',
            ], 400);
        }
        return response()->download(storage_path('app/' . $file->path), $file->filename);
    }

    /**
     * Supprime un fichier.
     *
     * @param Request $request
     * @param [type] $id le id du fichier à supprimer
     * @return JsonResponse Réponse JSON contenant le message de succès.
     */
    public function destroy(Request $request, $id)
    {
        $file = $request->user()->files()->find($id);
        if (is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        }

        $path = storage_path('app/' . $file->path);
        if (file_exists($path) && !$file->is_directory) {
            unlink($path);
        }

        if($file->is_directory) {
            $files = $file->files()->get();
            foreach($files as $f) {
                $path = storage_path('app/' . $f->path);
                if (file_exists($path) && !$f->is_directory) {
                    unlink($path);
                }
                $f->delete();
            }
        }
        $file->delete();


        return response()->json([
            'message' => 'Fichier supprimé avec succès.',
        ]);
    }

    /**
     * Met à jour la visibilité d'un fichier.
     *
     * @param Request $request
     * @param [type] $id le id du fichier à mettre à jour
     * @return JsonResponse Réponse JSON contenant le message de succès.
     */
    public function setPublic(Request $request, $id)
    {
        $request->validate([
            'public' => 'required|boolean',
        ]);

        $file = $request->user()->files()->find($id);
        if (is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        }

        $file->public = ($request->public);
        $file->save();

        return response()->json([
            'message' => 'Fichier mis à jour avec succès.',
        ]);
    }
}
