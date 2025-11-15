<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $userOne = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $companyOne = Company::factory()->create([
            'user_id' => $userOne->id,
        ]);

        Listing::factory(24)->create([
            'user_id' => $userOne->id,
            'company_id' => $companyOne->id,
        ]);

        $userTwo = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        $companyTwo = Company::factory()->create([
            'user_id' => $userTwo->id,
        ]);

        Listing::factory(6)->create([
            'user_id' => $userTwo->id,
            'company_id' => $companyTwo->id,
        ]);
    }
}
