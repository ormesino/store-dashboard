<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::filter()->get();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new Product;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->save();
        return response()->json([
            "message" => "Product record created"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json($product);
        } else {
            return response()->json([
                "message" => "Product not found"
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->name = is_null($request->name) ? $product->name : $request->name;
            $product->price = is_null($request->price) ? $product->price : $request->price;
            $product->description = is_null($request->description) ? $product->description : $request->description;
            $product->save();
            return response()->json($product);
        } else {
            return response()->json([
                "message" => "Product not found"
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return response()->json([
                "message" => "Product record deleted"
            ]);
        } else {
            return response()->json([
                "message" => "Product not found"
            ], 404);
        }
    }
}
