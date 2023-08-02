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
        'filesize'
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
}
