<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArchivesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('archives', function (Blueprint $table) {
            $table->unsignedBigInteger('id', true);//桁数の大きい数値型のカラム
            $table->unsignedBigInteger('factoryuser_id');
            $table->string('factoryuser_name');
            $table->unsignedBigInteger('staff_id');
            $table->string('staff_name');
            $table->dateTime('day');
            $table->text('archive_record');
            $table->text('archive_memo');
            // $table->timestamp('updated_at')->default(\DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
            // $table->timestamp('created_at')->default(\DB::raw('CURRENT_TIMESTAMP'));
            $table->foreign('factoryuser_id')->references('id')->on('factoryusers');
            $table->foreign('staff_id')->references('id')->on('users');
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
        Schema::dropIfExists('archives');
    }
}
