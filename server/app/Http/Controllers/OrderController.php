<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['client', 'product'])->filter()->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order = new Order;
        $order->client_id = $request->client_id; 
        $order->product_id = $request->product_id;
        $order->quantity = $request->quantity;
        $order->total = $request->total;
        $order->save();
        return response()->json([
            "message" => "Order record created"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id);
        if ($order) {
            return response()->json($order);
        } else {
            return response()->json([
                "message" => "Order not found"
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::find($id);
        if ($order) {
            $order->client_id = is_null($request->client_id) ? $order->client_id : $request->client_id;
            $order->product_id = is_null($request->product_id) ? $order->product_id : $request->product_id;
            $order->quantity = is_null($request->quantity) ? $order->quantity : $request->quantity;
            $order->total = is_null($request->total) ? $order->total : $request->total;
            $order->status = is_null($request->status) ? $order->status : $request->status;
            $order->save();
            return response()->json($order);
        } else {
            return response()->json([
                "message" => "Order not found"
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);
        if ($order) {
            $order->delete();
            return response()->json([
                "message" => "Order record deleted"
            ], 202);
        } else {
            return response()->json([
                "message" => "Order not found"
            ], 404);
        }
    }
}
