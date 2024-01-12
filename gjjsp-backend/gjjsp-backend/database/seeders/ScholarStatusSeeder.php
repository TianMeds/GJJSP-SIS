<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScholarStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('scholar_status')->insert([
            [
                'scholar_status_name' => 'New',
                'scholar_status_description' => 'New Scholar'
            ],
            [
                'scholar_status_name' => 'For Renewal',
                'scholar_status_description' => 'Scholar For Renewal'
            ],
            [
                'scholar_status_name' => 'For Renewal: Graduating',
                'scholar_status_description' => 'Scholar For Renewal: Graduating'
            ],
            [
                'scholar_status_name' => 'Renewed',
                'scholar_status_description' => 'Renewed Scholar'
            ],
            [
                'scholar_status_name' => 'Graduating',
                'scholar_status_description' => 'Graduating Scholar'
            ],
            [
                'scholar_status_name' => 'Graduated',
                'scholar_status_description' => 'Graduated Scholar'
            ],
            [
                'scholar_status_name' => 'Alumni',
                'scholar_status_description' => 'Scholar Alumni'
            ],
            [
                'scholar_status_name' => 'Withdrew',
                'scholar_status_description' => 'Scholar Withdrew'
            ]
        ]);
    }
}
