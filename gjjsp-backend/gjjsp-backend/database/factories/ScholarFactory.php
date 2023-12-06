<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Scholar>
 */
class ScholarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->numberBetween,
            'user_id' => $this->faker->randomDigit,
            'scholarship_type_id' => $this->faker->randomDigit,
            'project_partner_id' => $this->faker->randomDigit,
            'scholar_photo_filepath' => $this->faker->mimeType,
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'religion' => $this->faker->word,
            'birthdate' => $this->faker->dateTime->format('Y-m-d H:i:s'),
            'birthplace' => $this->faker->city,  // Assuming you want a city as a birthplace
            'civil_status' => $this->faker->randomElement(['Single', 'Married', 'Widowed', 'Separated']),
            'num_fam_mem' => $this->faker->numberBetween(1, 10),  // Assuming a range for family members
            'school_yr_started' => $this->faker->numberBetween(2000, 2022),  // Assuming a range for the school year
            'school_yr_graduated' => $this->faker->numberBetween(2000, 2022),  // Assuming a range for the graduation year
            'school_id' => $this->faker->randomDigit,
            'program' => $this->faker->word,  // Assuming a single word for the program
            'home_visit_sched' => $this->faker->dateTime->format('Y-m-d H:i:s'),  // Assuming a datetime format for home visit schedule
            'home_address_id' => $this->faker->randomDigit,  // Assuming a UUID for home_address_id
            'fb_account' => $this->faker->userName,  // Assuming a username for fb_account
            'scholar_status_id' => $this->faker->randomDigit,

        ];
    }
}
