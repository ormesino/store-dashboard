<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mehradsadeghi\FilterQueryString\FilterQueryString;

class Order extends Model
{
    use HasFactory, FilterQueryString;

    public $timestamps = false;

    protected $filters = [
        'like', 'sort', 'client_id' 
    ];

    protected $fillable = ['client_id', 'product_id', 'quantity', 'total', 'status'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
