<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    /**
     * @var array<string> $fillable
     */
    protected $fillable = [
      'first_name',
      'last_name',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'postal_code',
      'organization_id',
      'country_id',
    ];

    public function organization()
    {
      return $this->belongsTo(Organization::class);

    }

    public function country()
    {
      return $this->belongsTo(Country::class);
    }

    // Query Scope
    public function scopeSearch($query, $search)
    {
      return $query->where('first_name', 'LIKE', '%'.$search.'%')
        ->orWhere('last_name', 'LIKE', '%'.$search.'%')
        ->orWhere('city', 'LIKE', '%'.$search.'%')
        ->orWhere('phone', 'LIKE', '%'.$search.'%')
        ->orWhereHas('organization', function ($query) use ($search) {
          $query->where('name', 'LIKE', '%'.$search.'%');
        });
    }
}
