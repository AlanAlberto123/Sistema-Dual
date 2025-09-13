<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
      'student_id','type','path','original_name','mime','size','status',
      'reviewed_by','reviewed_at','review_comment'
    ];

    public function student(){ return $this->belongsTo(Student::class); }
    public function reviewer(){ return $this->belongsTo(User::class, 'reviewed_by'); }
}
