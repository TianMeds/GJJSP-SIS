<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('schools')->insert([
            [
                'school_name' => 'Ateneo De Manila University',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Assumption College – Makati City | Assumption college',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Don Bosco Technical College – Mandaluyong | Don Bosco Technical College',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Don Bosco Training Center Nueva Ecija',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Don Bosco Technical College – Technical Vocational Educational Technology',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Don Bosco Technical College – Mandaluyong – BATCH 18',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Don Bosco Technical College – Technical Vocational Educational Technology – BATCH 19',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Don Bosco Training Center Mandaluyong Technical Vocational Educational Technology',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Don Bosco Training Center Nueva Ecija c/o Fr. Clarence (Sr. Elizabeth Tolentino, FDCC)',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'University of St. La Salle – Bacolod',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'La Consolacion College – Bacolod',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'La Consolacion College – Manila',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'La Consolacion College – Binan',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'University of Negros Occidental – Recoletos | University of Negros Occidental',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'University of Perpetual Help System Dalta – Laguna',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Concordia College – Manila',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Canossa College of San Pablo City',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Iloilo Science and Technology University',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'West Visayas State University (Iloilo City) | West Visayas State University',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'ISAT-U, Colegio de Sagrado, U.I & Other State Colleges',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'University of Santo Tomas',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Polytech University of the Phiilippines ',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Centro Escolar University',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Makati Science Technological Institute of the Philippines',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Saint Pedro Poveda College',
                'school_type' => '',
                'school_address' => '',
            ],
            [
                'school_name' => 'Visayan Center for Hotel and Restaurant Services',
                'school_type' => '',
                'school_address' => '',
            ],
        ]);
        
    }
}
