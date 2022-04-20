<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ArchiveMemosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('archive_memos', function (Blueprint $table) {
            $table->unsignedBigInteger('id', true);//桁数の大きい数値型のカラム
            $table->unsignedBigInteger('factoryuser_id');
            $table->unsignedBigInteger('staff_id');
            $table->string('staff_name');
            $table->dateTime('day');
            $table->text('memo_record');
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
        Schema::dropIfExists('archive_memos');
    }
}
