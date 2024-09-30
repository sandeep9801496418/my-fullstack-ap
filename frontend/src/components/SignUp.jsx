import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = ()=>{
  const [formData, setFormData] =useState({
    username: '',
    email: '',
    dob: '',
    role: 'Explorer',
    location: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      alert('Passwords do not match');
      return;
    }

    try{
      await axios.post('/api/users/register', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return(
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
        <select name="role" onChange={handleChange} required>
          <option value="Explorer">Explorer</option>
          <option value="Admin">Admin</option>
        </select>
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
