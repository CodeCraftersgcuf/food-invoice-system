<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt PDF</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            background: none !important;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            color: #000;
            background: none !important;
        }
        .receipt-container {
            display: block;
            width: auto;
            min-width: 0;
            max-width: 370px;
            margin: 0;
            background: #fff;
            border: 1px solid #e0e0e0;
            padding: 18px 18px 10px 18px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .mt-10 { margin-top: 10px; }
        .mb-5 { margin-bottom: 5px; }
        .mb-10 { margin-bottom: 10px; }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 12px;
        }
        .table th, .table td {
            border: 1px solid #d0d0d0;
            padding: 4px 6px;
            text-align: left;
        }
        .table th {
            background: #f8f8f8;
        }
        .right { text-align: right; }
        .small { font-size: 11px; }
        .header-title {
            font-size: 17px;
            letter-spacing: 1px;
        }
        .divider {
            border-top: 1px dashed #bbb;
            margin: 10px 0 10px 0;
        }
        .footer {
            margin-top: 18px;
            font-size: 12px;
            color: #555;
        }
        .table tfoot td {
            background: #f8f8f8;
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="center bold header-title">FOODS Receipt</div>
        <div class="center small">GC University, Kotwali Road, Faisalabad</div>
        <div class="center small mb-10">SAM - Project</div>
        <div class="divider"></div>

        <table style="width:100%; font-size:12px;">
            <tr>
                <td><strong>Date</strong></td>
                <td>{{ \Carbon\Carbon::parse($receipt->created_at)->format('M d, Y') }}</td>
                <td><strong>Order Type</strong></td>
                <td>{{ ucfirst($receipt->status) }}</td>
            </tr>
            <tr>
                <td><strong>Order No.</strong></td>
                <td>{{ $receipt->id }}</td>
                <td><strong>You've Been</strong></td>
                <td>
                    @if($receipt->creator && $receipt->creator->name)
                        {{ $receipt->creator->name }}
                    @elseif($receipt->created_by)
                        {{ $receipt->created_by }}
                    @else
                        N/A
                    @endif
                </td>
            </tr>
            <tr>
                <td><strong>Customer</strong></td>
                <td>{{ $receipt->customer_name }}</td>
                <td><strong>Contact</strong></td>
                <td>{{ $receipt->customer_phone }}</td>
            </tr>
            <tr>
                <td><strong>Address</strong></td>
                <td colspan="3">{{ $receipt->customer_address }}</td>
            </tr>
        </table>

        <div class="bold center mt-10 mb-5">Sales Invoice</div>
        <table class="table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th class="right">Price</th>
                    <th class="right">Qty.</th>
                    <th class="right">Total</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $subtotal = 0;
                @endphp
                @foreach ($receipt->items as $item)
                    @php
                        $lineTotal = $item->quantity * $item->unit_price;
                        $subtotal += $lineTotal;
                    @endphp
                    <tr>
                        <td>{{ $item->item_name }}</td>
                        <td class="right">{{ number_format($item->unit_price, 2) }}</td>
                        <td class="right">{{ $item->quantity }}</td>
                        <td class="right">{{ number_format($lineTotal, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="right bold">Subtotal</td>
                    <td class="right">{{ number_format($subtotal, 2) }}</td>
                </tr>
                <tr>
                    <td colspan="3" class="right bold">Tax (5%)</td>
                    <td class="right">{{ number_format($subtotal * 0.05, 2) }}</td>
                </tr>
                <tr>
                    <td colspan="3" class="right bold">Total</td>
                    <td class="right">{{ number_format($subtotal + ($subtotal * 0.05), 2) }}</td>
                </tr>
                <tr>
                    <td colspan="3" class="right bold">Payable</td>
                    <td class="right bold">{{ number_format($subtotal + ($subtotal * 0.05), 2) }}</td>
                </tr>
            </tfoot>
        </table>

        <div class="center footer">Thank you for your order</div>
    </div>
</body>
</html>
