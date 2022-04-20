<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserIntermediateValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_intermediate_values', function (Blueprint $table) {
            $table->unsignedBigInteger('factoryuser_id');
            $table->unsignedBigInteger('record_id');
            $table->unsignedBigInteger('manuel_id');
            $table->unsignedBigInteger('medical_history_id');
            $table->unsignedBigInteger('treatment_id');
            
            $table->foreign('factoryuser_id')->references('id')->on('factoryusers');
            $table->foreign('record_id')->references('id')->on('records');
            $table->foreign('manuel_id')->references('id')->on('manuels');
            $table->foreign('medical_history_id')->references('id')->on('medical_histories');
            $table->foreign('treatment_id')->references('id')->on('treatments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_intermediate_values');
    }
}
