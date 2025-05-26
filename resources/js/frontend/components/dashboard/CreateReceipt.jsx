import React, { useState } from "react";
import axios from "axios";
import "./dashboard.css";

export default function CreateReceipt() {
    const [items, setItems] = useState([
        { item_name: "", quantity: 1, unit_price: 0 },
    ]);
    const [customer, setCustomer] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [status, setStatus] = useState("unpaid");
    const [dueDate, setDueDate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");

    const handleChange = (index, field, value) => {
        const updatedItems = [...items];
        if (field === "quantity" || field === "unit_price") {
            value = parseFloat(value) || 0;
        }
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { item_name: "", quantity: 1, unit_price: 0 }]);
    };

    const total = items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanedItems = items
            .filter(
                (item) =>
                    item.item_name.trim() !== "" &&
                    item.quantity > 0 &&
                    item.unit_price >= 0
            )
            .map((item) => ({
                item_name: item.item_name.trim(),
                // description is omitted
                quantity: parseInt(item.quantity),
                unit_price: parseFloat(item.unit_price),
            }));

        if (cleanedItems.length === 0) {
            alert("Please add at least one valid item.");
            return;
        }

        try {
            const res = await axios.post(
                "/api/receipts",
                {
                    customer_name: customer.trim(),
                    customer_email: customerEmail.trim(),
                    customer_phone: customerPhone.trim(),
                    customer_address: customerAddress.trim(),
                    status,
                    due_date: dueDate,
                    items: cleanedItems,
                    payment_method: paymentMethod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("✅ Receipt Created! ID: " + res.data.receipt_id);
            setCustomer("");
            setCustomerEmail("");
            setCustomerPhone("");
            setCustomerAddress("");
            setStatus("unpaid");
            setDueDate("");
            setPaymentMethod("cash");
            setItems([{ item_name: "", quantity: 1, unit_price: 0 }]);
        } catch (err) {
            console.error(err);
            alert("❌ Error creating receipt. Check console.");
        }
    };

    return (
        <div className="dashboard-wrapper">
            <h2>Create Receipt</h2>
            <form className="receipt-form" onSubmit={handleSubmit}>
                <label>Customer Name</label>
                <input
                    placeholder="Customer Name"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                />
                <label>Email</label>
                <input
                    placeholder="Customer Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <label>Phone</label>
                <input
                    placeholder="Customer Phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                />
                <label>Address</label>
                <input
                    placeholder="Customer Address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                />
                <label>Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                </select>
                <label>Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                />
                <label>Payment Method</label>
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                    <option value="cash">Cash</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                </select>

                <div className="table-header">
                    <span>Item Name</span>
                    {/* Description removed */}
                    <span>Quantity</span>
                    <span>Unit Price</span>
                </div>

                {items.map((item, i) => (
                    <div key={i} className="item-row" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "10px" }}>
                        <input
                            placeholder="Item Name"
                            value={item.item_name}
                            onChange={(e) =>
                                handleChange(i, "item_name", e.target.value)
                            }
                        />
                        {/* Description input removed */}
                        <input
                            type="number"
                            placeholder="Qty"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                                handleChange(i, "quantity", e.target.value)
                            }
                        />
                        <input
                            type="number"
                            placeholder="Unit Price"
                            step="0.01"
                            min="0"
                            value={item.unit_price}
                            onChange={(e) =>
                                handleChange(i, "unit_price", e.target.value)
                            }
                        />
                    </div>
                ))}

                <button
                    type="button"
                    className="add-item-btn"
                    onClick={addItem}
                >
                    + Add Item
                </button>

                <div className="total">Total: ${total.toFixed(2)}</div>

                <button type="submit">Create Receipt</button>
            </form>
        </div>
    );
}
