<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt PDF</title>
    <style>
        body { font-family: sans-serif; font-size: 14px; color: #000; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
        h2 { margin-bottom: 0; }
        p { margin: 4px 0; }
    </style>
</head>
<body>
    <h2>Receipt #{{ $receipt->id }}</h2>
    <p><strong>Customer:</strong> {{ $receipt->customer_name }}</p>
    <p><strong>Total:</strong> ${{ number_format($receipt->total_amount, 2) }}</p>
    <p><strong>Created At:</strong> {{ $receipt->created_at->format('d-m-Y H:i') }}</p>

    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($receipt->items as $item)
                <tr>
                    <td>{{ $item->item_name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>${{ number_format($item->unit_price, 2) }}</td>
                    <td>${{ number_format($item->total, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
