<?php

use Illuminate\Support\Facades\Route;

Route::view('{any}', 'LoginStudent')->where('any', '.*');
