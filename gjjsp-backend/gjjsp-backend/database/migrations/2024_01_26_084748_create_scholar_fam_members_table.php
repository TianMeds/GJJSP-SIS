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
        Schema::create('scholar_fam_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('scholar_id')->nullable();
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->enum('relation_to_scholar',['Mother','Father','Guardian', 'Other'])->nullable();
            $table->string('fam_mem_name')->nullable();
            $table->string('occupation')->nullable();
            $table->string('income')->nullable();
            $table->string('fam_mem_mobile_num')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholar_fam_members');
    }
};
