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
            $table->foreignId('scholar_id')->nullable()->constrained('scholars');
            $table->string('gwa_value')->nullable();
            $table->string('gwa_remarks')->nullable();
            $table->string('school_yr_submitted')->nullable();
            $table->string('term_submitted')->nullable();
            $table->string('copyOfReportCard')->nullable();
            $table->string('copyOfRegistrationForm')->nullable();
            $table->string('scannedWrittenEssay')->nullable();
            $table->string('letterOfGratitude')->nullable();
            $table->string('submission_status')->default('For Approval');
            $table->unsignedInteger('updated_by')->nullable()->constrained('users');
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
