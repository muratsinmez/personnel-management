import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = () => {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const username = localStorage.getItem("username");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/leave/create', {
      username,
      startDate: form.startDate,
      endDate: form.endDate,
      reason: form.reason
    })
    .then(() => {
      setSuccess(true);
      setForm({ startDate: '', endDate: '', reason: '' });
      setError('');
    })
    .catch(() => {
      setError("İzin talebi gönderilemedi.");
      setSuccess(false);
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>📄 Request for Permission</h2>
      {success && <p style={{ color: "green", textAlign: "center" }}>İzin talebi gönderildi ✅</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
          placeholder="Start date"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
          placeholder="Finish Date"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          required
          placeholder="Reason"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>Gönder</button>
      </form>
    </div>
  );
};

export default LeaveForm;
