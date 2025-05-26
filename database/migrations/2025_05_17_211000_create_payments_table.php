<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('receipt_id');
            $table->decimal('amount', 10, 2);
            $table->date('payment_date');
            $table->string('payment_method');
            $table->timestamps();

            $table->foreign('receipt_id')->references('id')->on('receipts')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
