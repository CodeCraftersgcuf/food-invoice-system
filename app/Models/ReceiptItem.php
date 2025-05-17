<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceiptItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'receipt_id',
        'item_name',
        'quantity',
        'unit_price',
        'total',
    ];

    public function receipt()
    {
        return $this->belongsTo(Receipt::class);
    }
}
