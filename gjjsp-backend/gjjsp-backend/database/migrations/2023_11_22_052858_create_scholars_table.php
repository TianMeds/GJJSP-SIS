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
        Schema::create('scholars', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('scholarship_type_id');
            $table->integer('project_partner_id');
            $table->string('scholar_photo_filepath');
            $table->enum('gender', ['Male', 'Female']);
            $table->string('religion');
            $table->date('birthdate');
            $table->string('birthplace');
            $table->string('civil_status');
            $table->integer('num_fam_mem');
            $table->year('school_yr_started');
            $table->year('school_yr_graduated');
            $table->integer('school_id');
            $table->string('program');
            $table->dateTime('home_visit_sched');
            $table->integer('home_address_id');
            $table->string('fb_account');
            $table->integer('scholar_status_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholars');
    }
};
