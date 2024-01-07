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
        Schema::create('scholarship_categs', function (Blueprint $table) {
            $table->id();
            $table->string('scholarship_categ_name');
            $table->string('alias');
            $table->string('benefactor');
            $table->string('scholarship_categ_status');
            $table->unsignedBigInteger('project_partner_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarship_categs');
    }
};
