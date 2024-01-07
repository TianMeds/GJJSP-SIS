<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScholarshipCategSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('scholarship_categs')->insert([
            [
                'scholarship_categ_name' => 'Formal Education with student assistance',
                'alias' => 'Formal Educ',
                'benefactor' => 'GADO (Ganet Management Corporation)',
                'scholarship_categ_status' => 'Open for Application',
                'project_partner_id' => 1,
            ],
            [
                'scholarship_categ_name' => 'Cara & Matthew Financial Aid for OSY & PWDS (Welcome Home Foundation)',
                'alias' => 'Cara & Matthew',
                'benefactor' => 'GADO (Ganet Management Corporation)',
                'scholarship_categ_status' => 'Closed for Application',
                'project_partner_id' => 2,
            ],
            [
                'scholarship_categ_name' => 'Asuncion & Angelita Assistance for Catechist',
                'alias' => 'Asuncion & Angelita',
                'benefactor' => 'GADO (Ganet Management Corporation)',
                'scholarship_categ_status' => 'Closed for Application',
                'project_partner_id' => 3,
            ],
        ]);
    }
}
