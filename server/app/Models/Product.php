<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mehradsadeghi\FilterQueryString\FilterQueryString;

class Product extends Model
{
    use HasFactory, FilterQueryString;

    public $timestamps = false;

    protected $filters = [
        'like', 'sort', 
    ];

    protected $fillable = ['name', 'price', 'description'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
