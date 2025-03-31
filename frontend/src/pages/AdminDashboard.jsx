import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import AdminLeavePanel from './AdminLeavePanel'; 

const AdminDashboard = () => {
  const [personnelList, setPersonnelList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    adress: '',
    username: '',
    password: '',
    department:'',
    employmentDate: '',
    salary: '',
    employeePoint: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/admin/getAll')
      .then(response => setPersonnelList(response.data))
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (editMode) {
      axios.put(`http://localhost:8080/api/admin/updateEmployee/${editingId}`, newEmployee)
        .then(response => {
          setPersonnelList(prev =>
            prev.map(p => (p.id === editingId ? response.data : p))
          );
          resetForm();
        })
        .catch(error => console.error("Güncelleme hatası:", error));
    } else {
      axios.post('http://localhost:8080/api/admin/addEmployee', newEmployee)
        .then(response => {
          setPersonnelList(prev => [...prev, response.data]);
          resetForm();
        })
        .catch(error => console.error("Ekleme hatası:", error));
    }
  };

  const handleEdit = (person) => {
    setNewEmployee(person);
    setEditingId(person.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/admin/delete/${id}`)
      .then(() => {
        setPersonnelList(prev => prev.filter(p => p.id !== id));
      })
      .catch(error => {
        console.error("Silme hatası:", error);
      });
  };

  const resetForm = () => {
    setNewEmployee({
      name: '',
      surname: '',
      phone: '',
      email: '',
      adress: '',
      username: '',
      password: '',
      department:'',
      employmentDate: '',
      salary: '',
      employeePoint: ''
    });
    setEditMode(false);
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin panel</h2>

      <button
        className="toggle-btn"
        onClick={() => {
          if (editMode || !showForm) {
            resetForm();
            setShowForm(true);
          } else {
            setShowForm(false);
          }
        }}
      >
        {showForm ? (editMode ? 'Cancel Update' : 'Close Form') : '➕ Add Employee'}
      </button>

      {showForm && (
        <form onSubmit={handleAddEmployee}>
          {Object.keys(newEmployee).map((key) => (
            <div key={key}>
              <input
                name={key}
                value={newEmployee[key]}
                onChange={handleInputChange}
                placeholder={key}
                required
              />
            </div>
          ))}
          <button type="submit">
            {editMode ? 'Save (Update)' : '➕ Save'}
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>username</th>
            <th>password</th>
            <th>department</th>
            <th>employment Date</th>
            <th>Salary</th>
            <th>employee Point</th>
            <th>Process</th>
            
          </tr>
        </thead>
        <tbody>
          {personnelList.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.surname}</td>
              <td>{p.phone}</td>
              <td>{p.email}</td>
              <td>{p.adress}</td>
              <td>{p.username}</td>
              <td>{p.password}</td>
              <td>{p.department}</td>
              <td>{p.employmentDate}</td>
              <td>{p.salary}</td>
              <td>{p.employee_point}</td>
              

              <td>
                <button className="update-btn" onClick={() => handleEdit(p)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {}
    <div style={{ marginTop: "50px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>📋 Requests for Leave</h3>
      <AdminLeavePanel />
    </div>
    </div>
  );
};

export default AdminDashboard;
