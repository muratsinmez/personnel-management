import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLeavePanel = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = () => {
    axios.get('http://localhost:8080/api/leave/all')
      .then(response => setLeaveRequests(response.data))
      .catch(error => console.error("İzin talepleri çekilemedi:", error));
  };

  const handleApprove = (id) => {
    axios.put(`http://localhost:8080/api/leave/approve/${id}`)
      .then(() => fetchLeaveRequests())
      .catch(error => console.error("Onaylama hatası:", error));
  };

  const handleReject = (id) => {
    axios.put(`http://localhost:8080/api/leave/reject/${id}`)
      .then(() => fetchLeaveRequests())
      .catch(error => console.error("Reddetme hatası:", error));
  };

  return (
    <div>
      <table style={{ width: "100%", marginTop: "20px" }} border="1" cellPadding="10">
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>starting date</th>
            <th>finish date</th>
            <th>reason</th>
            <th>statuss</th>
            <th>process</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(req => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.username}</td>
              <td>{req.startDate}</td>
              <td>{req.endDate}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
              <td>
                {req.status === 'pending' ? (
                  <>
                    <button onClick={() => handleApprove(req.id)}>✅ approve</button>
                    <button onClick={() => handleReject(req.id)}>❌ reject</button>
                  </>
                ) : (
                  <span>completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLeavePanel;
