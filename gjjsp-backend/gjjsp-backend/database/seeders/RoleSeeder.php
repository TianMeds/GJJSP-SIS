<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['roles_name' => 'Scholar Administrator', 'roles_description' => 'Administrator Role'],
            ['roles_name' => 'Scholar Manager', 'roles_description' => 'Scholar Manager Role'],
            ['roles_name' => 'Scholar', 'roles_description' => 'Scholar Roles'],
        ]);
    }
}
