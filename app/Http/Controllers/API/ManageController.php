<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Receipt;
use App\Models\Client;
use App\Models\Payment;
use Illuminate\Http\Request;

class ManageController extends Controller
{
    public function overview()
    {
        return response()->json([
            'invoices_count' => Receipt::count(),
            'clients_count' => Client::count(),
            'payments_count' => Payment::count(),
            'revenue' => Payment::sum('amount'),
            'outstanding' => Receipt::where('status', 'unpaid')->sum('total_amount'),
        ]);
    }

    public function invoices()
    {
        return response()->json(
            Receipt::with('items', 'client', 'payments', 'creator')->latest()->get()
        );
    }

    public function clients()
    {
        return response()->json(
            Client::with('receipts')->get()
        );
    }

    public function payments()
    {
        return response()->json(
            Payment::with('receipt')->latest()->get()
        );
    }

    public function reports()
    {
        return response()->json([
            'revenue' => Payment::sum('amount'),
            'outstanding' => Receipt::where('status', 'unpaid')->sum('total_amount'),
            'paid_count' => Receipt::where('status', 'paid')->count(),
            'unpaid_count' => Receipt::where('status', 'unpaid')->count(),
            'overdue_count' => Receipt::where('status', 'overdue')->count(),
        ]);
    }

    // CRUD methods for invoices, clients, payments, status, email (implement as needed)
    // For brevity, you can reuse logic from your existing controllers
}
