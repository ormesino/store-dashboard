<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $client = new Client;
        $client->name = $request->name;
        $client->email = $request->email;
        $client->phone = $request->phone;
        $client->password = Hash::make($request->password);
        $client->cpf = $request->cpf;
        $client->save();
        return response()->json([
            "message" => "Client record created"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Client::find($id);
        if ($client) {
            return response()->json($client);
        } else {
            return response()->json([
                "message" => "Client not found"
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $client = Client::find($id);
        if ($client) {
            $client->name = is_null($request->name) ? $client->name : $request->name;
            $client->email = is_null($request->email) ? $client->email : $request->email;
            $client->phone = is_null($request->phone) ? $client->phone : $request->phone;
            $client->password = is_null($request->password) ? Hash::make($client->password) : $request->password;
            $client->cpf = is_null($request->cpf) ? $client->cpf : $request->cpf;
            $client->save();
            return response()->json($client);
        } else {
            return response()->json([
                "message" => "Client not found"
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = Client::find($id);
        if ($client) {
            $client->delete();
            return response()->json([
                "message" => "Client record deleted"
            ]);
        } else {
            return response()->json([
                "message" => "Client not found"
            ], 404);
        }
    }
}
