<?php
namespace App\Http\Controllers;
use App\Http\Requests\Auth\LoginStudentRequest;
use App\Http\Requests\Auth\LoginCoordinatorRequest;
use App\Http\Requests\Auth\LoginAdminRequest;
use App\Services\Auth\StudentLogin;
use App\Services\Auth\CoordinatorLogin;
use App\Services\Auth\AdminLogin;

class AuthController extends Controller {
    public function loginStudent(LoginStudentRequest $request, StudentLogin $service) {
        $data = $service->login($request->validated());
        return response()->json($data, 200);
    }
    public function loginCoordinator(LoginCoordinatorRequest $request, CoordinatorLogin $service) {
        $data = $service->login($request->validated());
        return response()->json($data, 200);
    }
    public function loginAdmin(LoginAdminRequest $request, AdminLogin $service) {
        $data = $service->login($request->validated());
        return response()->json($data, 200);
    }
}