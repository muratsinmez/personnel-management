import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/auth/login', { username, password })
      .then(response => {
        const user = response.data;

        // localStorage'a username ve role kaydet
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);

        // Rol bazlı yönlendirme
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "employee") {
          navigate("/employee");
        } else {
          setError("Geçersiz rol bilgisi alındı.");
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          setError("Şifre hatalı.");
        } else if (err.response && err.response.status === 404) {
          setError("Kullanıcı bulunamadı.");
        } else {
          setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>🔐 Sign In</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
