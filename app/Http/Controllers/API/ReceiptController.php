<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Receipt;
use App\Models\ReceiptItem;
use Illuminate\Http\Request;
 use Barryvdh\DomPDF\Facade\Pdf;
class ReceiptController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.item_name' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $total = collect($data['items'])->sum(fn($item) => $item['quantity'] * $item['unit_price']);

        $receipt = Receipt::create([
            'customer_name' => $data['customer_name'],
            'total_amount' => $total,
            'created_by' => auth()->id(),
        ]);

        foreach ($data['items'] as $item) {
            ReceiptItem::create([
                'receipt_id' => $receipt->id,
                'item_name' => $item['item_name'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total' => $item['quantity'] * $item['unit_price'],
            ]);
        }

        return response()->json(['message' => 'Receipt created', 'receipt_id' => $receipt->id]);
    }

    public function index()
    {
        $user = auth()->user();

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $receipts = \App\Models\Receipt::with('items', 'creator')->latest()->get();

        return response()->json($receipts);
    }

   

    public function generatePdf($id)
    {
        $receipt = Receipt::with('items')->findOrFail($id);

        $pdf = Pdf::loadView('pdf.receipt', compact('receipt'));
        return $pdf->download("receipt_{$id}.pdf");
    }

}

