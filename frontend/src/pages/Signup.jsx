import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/signup', formData);
      login(data.token);
      navigate('/');
    } catch (err) {
      alert('User already exists or error signing up');
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <input type="text" name="username" value={formData.username} onChange={onChange} placeholder="Username" required className="w-full p-2 mb-2 border"/>
      <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Password" required className="w-full p-2 mb-4 border"/>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;