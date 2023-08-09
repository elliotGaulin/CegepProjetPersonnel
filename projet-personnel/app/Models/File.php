<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modèle d'un fichier.
 */
class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename',
        'path',
        'filesize',
        'public',
        'is_directory',
        'parent_id',
        'mime_type',
    ];

    /**
     * Récupère l'utilisateur propriétaire du fichier.
     *
     * @return User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Récupère le dossier parent du fichier.
     *
     * @return File
     */
    public function parent()
    {
        return $this->belongsTo(File::class);
    }

    /**
     * Récupère les fichiers enfants du fichier.
     *
     * @return File[]
     */
    public function files()
    {
        return $this->hasMany(File::class, 'parent_id');
    }
}
