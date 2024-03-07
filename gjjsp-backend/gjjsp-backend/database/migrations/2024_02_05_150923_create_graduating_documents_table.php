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
        Schema::create('graduating_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scholar_id')->nullable()->constrained('scholars');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('graduateName')->nullable();
            $table->string('schoolGraduated')->nullable();
            $table->string('addressSchool')->nullable();
            $table->string('yearEnteredGraduated')->nullable();
            $table->string('program')->nullable();
            $table->string('street')->nullable();
            $table->string('user_email_address')->nullable();
            $table->string('user_mobile_num')->nullable();
            $table->string('futurePlan')->nullable();
            $table->string('school_yr_submitted')->nullable();
            $table->string('copyOfReportCard')->nullable();
            $table->string('copyOfRegistrationForm')->nullable();
            $table->string('scannedWrittenEssay')->nullable();
            $table->string('letterOfGratitude')->nullable();
            $table->string('statementOfAccount')->nullable();
            $table->string('graduationPicture')->nullable();
            $table->string('transcriptOfRecords')->nullable();
            $table->string('submission_status')->default('For Approval');
            $table->unsignedInteger('updated_by')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('graduating_documents');
    }
};
