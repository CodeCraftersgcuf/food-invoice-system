import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

export default function AdminReceipts() {
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const res = await axios.get("/api/receipts", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setReceipts(res.data);
            } catch (err) {
                console.error(err);
                alert("Unauthorized or error loading receipts");
            }
        };
        fetchReceipts();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <h2>All Receipts</h2>
            {receipts.length === 0 ? (
                <p>No receipts found.</p>
            ) : (
                <div className="receipt-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Created</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.customer_name}</td>
                                    <td>${r.total_amount}</td>
                                    <td>{new Date(r.created_at).toLocaleString()}</td>
                                    <td>
                                        <a
                                            className="download-link"
                                            href={`/api/receipts/${r.id}/pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Download PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
