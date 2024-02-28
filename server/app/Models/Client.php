<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mehradsadeghi\FilterQueryString\FilterQueryString;

class Client extends Model
{
    use HasFactory, FilterQueryString;

    protected $filters = [
        'like', 'sort', 
    ];
    
    protected $fillable = ['name', 'email', 'phone', 'password', 'cpf'];
    protected $hidden = ['password'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
