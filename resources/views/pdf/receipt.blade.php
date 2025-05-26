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
    <h2>Receipt</h2>
    <p>
        <strong>Created By:</strong>
        @if($receipt->creator && $receipt->creator->name)
            {{ $receipt->creator->name }}
        @elseif($receipt->created_by)
            {{ $receipt->created_by }}
        @else
            N/A
        @endif
    </p>
    <p><strong>Customer:</strong> {{ $receipt->customer_name }}</p>
    <p><strong>Email:</strong> {{ $receipt->customer_email }}</p>
    <p><strong>Phone:</strong> {{ $receipt->customer_phone }}</p>
    <p><strong>Address:</strong> {{ $receipt->customer_address }}</p>
    <p><strong>Status:</strong> {{ $receipt->status }}</p>
    <p><strong>Due Date:</strong> {{ $receipt->due_date }}</p>
    <p><strong>Total:</strong> ${{ number_format($receipt->total_amount, 2) }}</p>
    <p><strong>Created At:</strong> {{ $receipt->created_at->format('d-m-Y H:i') }}</p>

    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($receipt->items as $item)
                <tr>
                    <td>{{ $item->item_name }}</td>
                    <td>{{ $item->description }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>${{ number_format($item->unit_price, 2) }}</td>
                    <td>${{ number_format($item->total, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if($receipt->payments && $receipt->payments->count())
        <h3>Payments</h3>
        <table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>Method</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($receipt->payments as $payment)
                    <tr>
                        <td>${{ number_format($payment->amount, 2) }}</td>
                        <td>{{ $payment->payment_date }}</td>
                        <td>{{ $payment->payment_method }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
</body>
</html>
