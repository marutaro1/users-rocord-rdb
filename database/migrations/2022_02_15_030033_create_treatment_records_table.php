<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTreatmentRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('treatment_records', function (Blueprint $table) {
            $table->unsignedBigInteger('id', true);//桁数の大きい数値型のカラム
            $table->unsignedBigInteger('factoryuser_id');
            $table->dateTime('day');
            $table->unsignedBigInteger('treatment_id');
            $table->text('treatment_value');
            $table->string('staff_name');
            $table->softDeletes();//論理削除を定義->deleted_atを自動生成
            $table->timestamp('updated_at')->default(\DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
            $table->timestamp('created_at')->default(\DB::raw('CURRENT_TIMESTAMP'));
            $table->foreign('factoryuser_id')->references('id')->on('factoryusers');
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
        Schema::dropIfExists('treatment_records');
    }
}