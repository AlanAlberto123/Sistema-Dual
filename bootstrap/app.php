<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Routing\Middleware\ThrottleRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'bindings' => SubstituteBindings::class,
            'throttle' => ThrottleRequests::class,
            'sanctum' => EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->group('api', [
            'sanctum',
            'throttle:api',
            'bindings',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();