<?php

use Illuminate\Support\Facades\Route;

Route::view('{any}', 'LoginStudent')->where('any', '.*');

Route::view('/LoginCoordinator', 'LoginCoordinator')->name('coordinator.login');

