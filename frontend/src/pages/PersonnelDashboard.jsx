import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeaveForm from '../pages/LeaveForm'; 
import MyLeaves from '../pages/MyLeaves'; 


const PersonnelDashboard = () => {
  const [personnel, setPersonnel] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username") || "1234";

    axios.get(`http://localhost:8080/api/employee/me?username=${username}`)
      .then(response => {
        setPersonnel(response.data);
      })
      .catch(error => {
        console.error("Veri çekilirken hata oluştu:", error);
      });
  }, []);

  if (!personnel) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>👩‍💼 Employee Page</h2>

      <table
        style={{
          width: "100%",
          textAlign: "center",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Username</th>
            <th>Salary</th>
            <th>Point</th>
            <th>Employement Date</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: "#fafafa" }}>
            <td>{personnel.name}</td>
            <td>{personnel.surname}</td>
            <td>{personnel.email}</td>
            <td>{personnel.phone}</td>
            <td>{personnel.adress}</td>
            <td>{personnel.username}</td>
            <td>{personnel.salary} ₺</td>
            <td>{personnel.employee_point}</td>
            <td>{personnel.employmentDate}</td>
            <td>{personnel.department}</td>
          </tr>
        </tbody>
      </table>

      {}
      <div style={{ marginTop: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <LeaveForm />
      </div>
      {}
    <div style={{ marginTop: "40px" }}>
      <MyLeaves />
    </div>
    </div>
  );
};

export default PersonnelDashboard;
