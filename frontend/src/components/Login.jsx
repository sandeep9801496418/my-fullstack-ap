import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = ()=>{
  const [formData, setFormData] = useState({username: '', password: ''});
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const response = await axios.post('/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    }catch(error){
      console.error('Login failed', error);
    }
  };

  return(
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
