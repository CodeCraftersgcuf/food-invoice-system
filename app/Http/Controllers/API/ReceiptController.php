<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Receipt;
use App\Models\ReceiptItem;
use App\Models\Payment; // Add this import
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ReceiptController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name' => 'nullable|string',
            'customer_email' => 'nullable|email',
            'customer_phone' => 'nullable|string',
            'customer_address' => 'nullable|string',
            'status' => 'nullable|string',
            'due_date' => 'nullable|date',
            'items' => 'required|array|min:1',
            'items.*.item_name' => 'required|string',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'created_by' => 'nullable', // allow created_by from request if not using auth
        ]);

        // Find or create client
        $client = \App\Models\Client::firstOrCreate(
            [
                'email' => $request->customer_email,
            ],
            [
                'name' => $request->customer_name,
                'phone' => $request->customer_phone,
                'address' => $request->customer_address,
            ]
        );

        $total = collect($data['items'])->sum(function ($item) {
            return (int) $item['quantity'] * (float) $item['unit_price'];
        });

        // Calculate tax (5% for example)
        $tax = round($total * 0.05, 2);
        $grandTotal = $total + $tax;

        $receipt = Receipt::create([
            'customer_name' => $data['customer_name'],
            'customer_email' => $data['customer_email'] ?? null,
            'customer_phone' => $data['customer_phone'] ?? null,
            'customer_address' => $data['customer_address'] ?? null,
            'total_amount' => $grandTotal,
            'status' => $data['status'] ?? 'unpaid',
            'due_date' => $data['due_date'] ?? null,
            'created_by' => $data['created_by'] ?? auth()->id(),
            'tax' => $tax, // add tax if you have this column
            'client_id' => $client->id, // associate client
        ]);

        foreach ($data['items'] as $item) {
            ReceiptItem::create([
                'receipt_id' => $receipt->id,
                'item_name' => $item['item_name'],
                'description' => $item['description'] ?? null,
                'quantity' => (int) $item['quantity'],
                'unit_price' => (float) $item['unit_price'],
                'total' => (int) $item['quantity'] * (float) $item['unit_price'],
            ]);
        }

        // Store payment record (assume full payment for now)
        Payment::create([
            'receipt_id' => $receipt->id,
            'amount' => $grandTotal,
            'payment_date' => now(),
            'payment_method' => 'Cash', // or get from request
        ]);

        return response()->json(['message' => 'Receipt created', 'receipt_id' => $receipt->id]);
    }

    public function index()
    {
        $user = auth()->user();

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $receipts = \App\Models\Receipt::with('items', 'creator', 'payments')->latest()->get();

        return response()->json($receipts);
    }

    public function generatePdf($id)
    {
        $receipt = Receipt::with('items', 'payments', 'creator')->findOrFail($id);

        $pdf = Pdf::loadView('pdf.receipt', compact('receipt'));
        return $pdf->download("receipt_{$id}.pdf");
    }
}

