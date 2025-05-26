import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

export default function ManageDashboard() {
  const [tab, setTab] = useState("invoices");
  const [overview, setOverview] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reports, setReports] = useState({});

  useEffect(() => {
    axios.get("/api/manage/overview", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => setOverview(res.data));
    axios.get("/api/manage/invoices", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => setInvoices(res.data));
    axios.get("/api/manage/clients", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => setClients(res.data));
    axios.get("/api/manage/payments", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => setPayments(res.data));
    axios.get("/api/manage/reports", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => setReports(res.data));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h2>Management Dashboard</h2>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("overview")}>Overview</button>
        <button onClick={() => setTab("invoices")}>Invoices</button>
        <button onClick={() => setTab("clients")}>Clients</button>
        <button onClick={() => setTab("payments")}>Payments</button>
        <button onClick={() => setTab("reports")}>Reports</button>
      </div>
      {tab === "overview" && (
        <div>
          <h3>Summary</h3>
          <ul>
            <li>Total Invoices: {overview.invoices_count}</li>
            <li>Total Clients: {overview.clients_count}</li>
            <li>Total Payments: {overview.payments_count}</li>
            <li>Total Revenue: ${overview.revenue}</li>
            <li>Outstanding: ${overview.outstanding}</li>
          </ul>
        </div>
      )}
      {tab === "invoices" && (
        <div className="receipt-table">
          <h3>Invoices</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Status</th>
                <th>Total</th>
                <th>Created</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.client ? inv.client.name : inv.customer_name}</td>
                  <td>{inv.status}</td>
                  <td>${inv.total_amount}</td>
                  <td>{new Date(inv.created_at).toLocaleString()}</td>
                  <td>
                    <a className="download-link" href={`/api/receipts/${inv.id}/pdf`} target="_blank" rel="noreferrer">
                      PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "clients" && (
        <div className="receipt-table">
          <h3>Clients</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Invoices</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.receipts ? c.receipts.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "payments" && (
        <div className="receipt-table">
          <h3>Payments</h3>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>${p.amount}</td>
                  <td>{p.payment_date}</td>
                  <td>{p.payment_method}</td>
                  <td>{p.receipt_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "reports" && (
        <div>
          <h3>Reports</h3>
          <ul>
            <li>Total Revenue: ${reports.revenue}</li>
            <li>Outstanding: ${reports.outstanding}</li>
            <li>Paid Invoices: {reports.paid_count}</li>
            <li>Unpaid Invoices: {reports.unpaid_count}</li>
            <li>Overdue Invoices: {reports.overdue_count}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
