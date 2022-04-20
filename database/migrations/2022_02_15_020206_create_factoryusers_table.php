<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFactoryusersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()//マイグレーションを実行したときに行われる処理
    {
        Schema::create('factoryusers', function (Blueprint $table) {
            $table->unsignedBigInteger('id', true);//桁数の大きい数値型のカラム
            $table->unsignedBigInteger('number');
            $table->string('factoryuser_name', 100);
            $table->date('birthday', 100);
            $table->string('care_level', 10);
            $table->boolean('day_record_check');
            $table->softDeletes();//論理削除を定義->deleted_atを自動生成
            $table->timestamp('updated_at')->default(\DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
            $table->timestamp('created_at')->default(\DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()//ロールバックした時に元の形戻る。そのp時の型をかく
    {
        Schema::dropIfExists('factoryusers');//テーブルを削除する
    }
}
