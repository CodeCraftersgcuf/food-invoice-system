import React, { useState } from "react";
import axios from "axios";
import "./dashboard.css";

export default function CreateReceipt() {
    const [items, setItems] = useState([
        { item_name: "", quantity: 1, unit_price: 0 },
    ]);
    const [customer, setCustomer] = useState("");

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
                    items: cleanedItems,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("✅ Receipt Created! ID: " + res.data.receipt_id);
            setCustomer("");
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

                <div className="table-header">
                    <span>Item Name</span>
                    <span>Quantity</span>
                    <span>Unit Price</span>
                </div>

                {items.map((item, i) => (
                    <div key={i} className="item-row">
                        <input
                            placeholder="Item Name"
                            value={item.item_name}
                            onChange={(e) =>
                                handleChange(i, "item_name", e.target.value)
                            }
                        />
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
