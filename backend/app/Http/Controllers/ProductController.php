<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        return Product::all()->toJson();
    }

    public function findOne($id){
        return Product::where('id', $id)->get();
    }
}
