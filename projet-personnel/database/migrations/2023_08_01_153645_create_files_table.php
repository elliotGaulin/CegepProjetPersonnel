<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Création de la table files pour stocker les fichiers
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('filename', 255);
            $table->string('path', 1024)->nullable()->unique();
            $table->integer('filesize');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->boolean('public')->default(false);
            $table->boolean('is_directory')->default(false);
            $table->foreignId('parent_id')->nullable()->constrained('files')->onDelete('cascade');
            $table->string('mime_type', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Suppression de la table files
        Schema::dropIfExists('files');
    }
};
