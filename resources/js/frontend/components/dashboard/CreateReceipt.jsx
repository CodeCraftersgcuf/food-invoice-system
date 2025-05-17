import React, { useState } from 'react';
import axios from 'axios';
import './dashboard.css';

export default function CreateReceipt() {
  const [items, setItems] = useState([{ item_name: '', quantity: 1, unit_price: 0 }]);
  const [customer, setCustomer] = useState('');

  const handleChange = (i, field, value) => {
    const copy = [...items];
    copy[i][field] = value;
    setItems(copy);
  };

  const addItem = () => {
    setItems([...items, { item_name: '', quantity: 1, unit_price: 0 }]);
  };

  const total = items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/receipts', {
        customer_name: customer,
        items
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Receipt Created! ID: ' + res.data.receipt_id);
    } catch (err) {
      console.error(err);
      alert('Error creating receipt');
    }
  };

 return (
  <div className="dashboard-wrapper">
    <h2>Create Receipt</h2>
    <form className="receipt-form" onSubmit={handleSubmit}>
      <input
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      {items.map((item, i) => (
        <div key={i}>
          <input
            placeholder="Item Name"
            value={item.item_name}
            onChange={(e) => handleChange(i, 'item_name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleChange(i, 'quantity', +e.target.value)}
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={item.unit_price}
            onChange={(e) => handleChange(i, 'unit_price', +e.target.value)}
          />
        </div>
      ))}
      <button type="button" className="add-item-btn" onClick={addItem}>
        + Add Item
      </button>
      <div className="total">Total: ${total.toFixed(2)}</div>
      <button type="submit">Create Receipt</button>
    </form>
  </div>
);

}
