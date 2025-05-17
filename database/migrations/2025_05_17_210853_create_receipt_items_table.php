<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
    */
public function up()
{
    Schema::create('receipt_items', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('receipt_id');
        $table->string('item_name');
        $table->integer('quantity');
        $table->decimal('unit_price', 10, 2);
        $table->decimal('total', 10, 2);
        $table->timestamps();

        $table->foreign('receipt_id')->references('id')->on('receipts')->onDelete('cascade');
});
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipt_items');
    }
};
