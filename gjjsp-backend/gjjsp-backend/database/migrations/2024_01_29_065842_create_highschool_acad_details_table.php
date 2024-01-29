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
        Schema::create('highschool_acad_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scholar_id')->nullable()->constrained('scholars');
            $table->string('track_name')->nullable();
            $table->string('strand_name')->nullable();
            $table->string('gwa_school_yr_graduated')->nullable();
            $table->string('school_name')->nullable();
            $table->string('school_address')->nullable();
            $table->string('school_yr_graduated_hs')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('highschool_acad_details');
    }
};
