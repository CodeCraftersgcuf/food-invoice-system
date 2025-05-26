<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'currency',
        'tax_rate',
        'company_name',
        'company_address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
