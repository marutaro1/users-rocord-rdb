<?php

namespace Database\Seeders;

use App\Models\Factoryuser;
use Illuminate\Database\Seeder;

class FactoryusersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            Factoryuser::create([
                'factoryuser_name' => "'factoryuser' + $i",
                'birthday' => '1995-12-17',
                'care_level' => '自立',
                'number' => $i,
                'day_record_check' => false,
            ]);
        }
    }
}
