import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Login sayfasında navbar gösterme (isteğe bağlı)
  if (location.pathname === "/") return null;

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/admin" style={styles.link}>Admin Panel</Link></li>
        <li style={styles.li}><Link to="/employee" style={styles.link}>Employee Page</Link></li>
        <li style={styles.li}><Link to="/register" style={styles.link}>Sign Up</Link></li>
        <li style={styles.li}><Link to="/" style={styles.link}>Quit</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#222',
    padding: '10px'
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0
  },
  li: {
    margin: '0 15px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Navbar;
