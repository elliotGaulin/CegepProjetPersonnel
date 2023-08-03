<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

/**
 * Controlleur des fichiers.
 */
class FileController extends Controller
{
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
        ]);

        $path = $request->file('file')->store('files');

        $file = $request->user()->files()->create([
            'filename' => $request->file('file')->getClientOriginalName(),
            'path' => $path,
            'filesize' => $request->file('file')->getSize(),
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
        if(is_null($file)) {
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
        if(is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
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
        if(is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
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
        if(is_null($file)) {
            return response()->json([
                'message' => 'Fichier introuvable.',
            ], 404);
        }

        $path = storage_path('app/' . $file->path);
        if(file_exists($path)) {
            unlink($path);
        }
        $file->delete();

        return response()->json([
            'message' => 'Fichier supprimé avec succès.',
        ]);
    }
}
