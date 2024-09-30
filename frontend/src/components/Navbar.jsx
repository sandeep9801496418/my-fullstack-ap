import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

const Navbar = ()=>{
  const [username, setUsername] =useState('');
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    setUsername('');
    navigate('/login');
  };

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token){
      try{
        const user =JSON.parse(atob(token.split('.')[1]));
        setUsername(user.username);
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  },[]);

  return (
    <nav className="navbar">
      <div className="brand">
        <img src="/path/to/logo.png" alt="Logo" className="logo" /> 
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {!username ?(
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li>Welcome, {username}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
