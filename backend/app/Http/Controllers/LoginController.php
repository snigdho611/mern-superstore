<?php

namespace App\Http\Controllers;

use App\Models\Login;
use App\Models\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function authenticate(Request $request){
        $check = Login::
                    where('username', $request->input('username'))->
                    where('password', $request->input('password'))
                    ->first();
        if($check){
            return User::where('id', $check->id)->get();
        }else{
            return [];
        }
    }
}
