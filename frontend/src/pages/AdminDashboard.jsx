import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';


const Dashboard = () => {
  const [userData, setUserData] = useState('');
  const [userList, setUserList] = useState([]);
//   const role = localStorage.getItem('role');

  useEffect(() => {
    axiosInstance.get('/user/profile').then(res => {
      setUserData(res.data);
    });
  }, []);

  const users = ()=>{
axiosInstance.get('/admin/users').then(res=>{
setUserList(res.data);
})
}
  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      <p>Name: {userData.name}</p>
      <p>Email:{userData.email}</p>
      <p>Role:{userData.role}</p>
      {/* {role === 'admin' && <button onClick={() => users()}>View Users</button>} */}
      <button style={{backgroundColor:"lightgreen"}} onClick={() => users()}>View Users</button>



{userList.map((user, index) => (
  <div key={index} style={{backgroundColor:"lightblue"}}>
    <p>{user.name}</p>
    <p>{user.email}</p>
  </div>
))}

    </div>
  );
};

export default Dashboard;
