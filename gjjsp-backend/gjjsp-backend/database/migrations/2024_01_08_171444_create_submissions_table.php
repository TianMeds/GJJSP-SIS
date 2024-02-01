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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submitted_by')->constrained('scholars');
            $table->string('submission_type')->nullable();
            $table->string('school_yr_submitted')->nullable();
            $table->string('term_submitted')->nullable();
            $table->string('due_datetime')->nullable();
            $table->dateTime('submitted_datetime')->nullable()->default(now());
            $table->string('submission_status')->nullable();
            $table->string('updated_by')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
