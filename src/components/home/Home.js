import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import EmployeeContextProvider from '../../context/employee/EmployeeContextProvider';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  });

  return (
    <div>
      <EmployeeContextProvider>
        <Navbar />
        <Outlet />
      </EmployeeContextProvider>
    </div>
  );
};

export default Home;
