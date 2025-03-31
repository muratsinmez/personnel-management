import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/leave/${username}`)
      .then(res => setLeaves(res.data))
      .catch(err => console.error("İzinler çekilemedi:", err));
  }, [username]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h3 style={{ textAlign: "center" }}>📅 Leave history</h3>
      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>Start</th>
            <th>Finish</th>
            <th>reason</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaves;
