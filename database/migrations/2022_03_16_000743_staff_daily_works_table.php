<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StaffDailyWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_daily_works', function (Blueprint $table) {
            $table->unsignedBigInteger('id', true);
            $table->string('staff_name');
            $table->string('day');
            $table->string('department');
            $table->string('phs');
            $table->string('works');
            $table->boolean('complete_work_check');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('staff_daily_works');
    }
}
