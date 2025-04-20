import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  // const role = localStorage.getItem('role');

  useEffect(() => {
    axiosInstance.get('/user/profile')
      .then(res => {
        console.log(res.data)
        setProfile(res.data)
      })
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    const user_id = localStorage.getItem('user_id');
  
    axiosInstance.post(`/logout/${user_id}`)
      .then(() => {
        localStorage.clear(); 
        window.location.href = '/login'; 
      }) 
      .catch(err => {
        console.error('Logout failed:', err);
      });
  };
  
  return (
    <div>
      <h1>  Welcome</h1>
      <h2>Name: {profile.name}</h2>
      <h2>Email: {profile.email}</h2>
      <h2>Role:  {profile.role}</h2>
      {/* {role === 'admin' && <button>View Users</button>} */}
      <button type="submit" className='text-primary' style={{backgroundColor:"blue", color:"white"}} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
