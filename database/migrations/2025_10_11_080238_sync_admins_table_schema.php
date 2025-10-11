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
    Schema::table('admins', function (Blueprint $table) {
        if (!Schema::hasColumn('admins', 'user_id')) {
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
        }
        if (!Schema::hasColumn('admins', 'nombre'))    $table->string('nombre');
        if (!Schema::hasColumn('admins', 'apellidos')) $table->string('apellidos');
        if (!Schema::hasColumn('admins', 'telefono'))  $table->string('telefono', 20);
    });
}
public function down(): void {}
};
