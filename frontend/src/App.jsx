// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Register from './components/Register';
// import Welcome from './components/Welcome';

// function App() {
//   return (
//     <Routes>
// <Route path="/welcome" element={<Welcome />} />
// <Route path="/" element={<Register />} />

//     </Routes>
//   );
// }

// export default App;


// // import React, { useState, useEffect } from 'react'; function App() { 
// //   const [seconds, setSeconds] = useState(0); 
// //   useEffect(() => { 
// //   const interval = setInterval(() => 
// //   setSeconds((s) => s + 1), 1000); 
// //   return () => clearInterval(interval);
// //    },
// //    []); 
  
// //   return <p>Seconds: {seconds}</p>; }
  

// //   export default App;


import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import RequireAuth from './utils/RequireAuth';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import "./App.css"
import MapView from './components/MapView';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/map" element={<MapView />} />

        {/* USER + ADMIN */}
        <Route element={<RequireAuth allowedRoles={['user', 'admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* ADMIN ONLY  */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route> 
      </Routes>
  );
};

export default App;
