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
        Schema::create('renewal_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scholar_id')->constrained('scholars');
            $table->string('gwa_value');
            $table->string('gwa_remarks');
            $table->string('copyOfReportCard');
            $table->string('copyOfRegistrationForm');
            $table->string('scannedWrittenEssay');
            $table->string('letterOfGratitude');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('renewal_documents');
    }
};
