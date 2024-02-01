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
        Schema::create('alumni_forms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained('submissions');
            $table->string('company_name')->nullable();
            $table->string('position_in_company')->nullable();
            $table->string('company_location')->nullable();
            $table->string('licensure_exam_type')->nullable();
            $table->string('exam_passed_date')->nullable();
            $table->string('volunteer_group_name')->nullable();
            $table->string('yr_volunteered')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumni_forms');
    }
};
