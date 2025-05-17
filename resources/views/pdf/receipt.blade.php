<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt PDF</title>
    <style>
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
    </style>
</head>
<body>
    <h2>Receipt #{{ $receipt->id }}</h2>
    <p><strong>Customer:</strong> {{ $receipt->customer_name }}</p>
    <p><strong>Total:</strong> ${{ $receipt->total_amount }}</p>
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
                    <td>${{ $item->unit_price }}</td>
                    <td>${{ $item->total }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
