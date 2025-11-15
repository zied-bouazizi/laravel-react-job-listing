<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    protected $fillable = ['user_id', 'company_id', 'title', 'type', 'description', 'location', 'salary'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
