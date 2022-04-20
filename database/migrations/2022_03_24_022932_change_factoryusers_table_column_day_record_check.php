<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFactoryusersTableColumnDayRecordCheck extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('factoryusers', function (Blueprint $table) {
           // カラム「day_record_check」を「string型」に変更
            $table->string('day_record_check')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('factoryusers', function (Blueprint $table) {
            $table->string('day_record_check')->change();
        });
    }
}
