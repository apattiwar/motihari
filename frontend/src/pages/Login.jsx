import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/login', { email, password });
      const { token, role ,user_id} = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);

      role === 'admin' ? navigate('/adminDashboard') : navigate('/dashboard');
    } catch (err) {
    //   alert('Login failed');
      console.log(err);
    }
  };

 const handleNavigate=()=>{
navigate("/")
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br/><button type="submit" style={{backgroundColor:"#007bff"}}>Login</button>
      <button style={{backgroundColor:"GREEN"}} onClick={()=>handleNavigate()}>Home</button>

    </form>
  );
};

export default Login;
