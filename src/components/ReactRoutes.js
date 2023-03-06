import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import Login from './auth/Login';
import Signup from './auth/Signup';
import AddEmployee from './home/AddEmployee';
import EmployeeList from './home/EmployeeList';
import Home from './home/Home';

const ReactRoutes = (props) => {
  return (
    <div className='container'>
      <Routes>
        <Route exact path='/' element={<Navigate to='/login' />} />
        <Route
          exact
          path='login'
          element={<Login showAlert={props.showAlert} />}
        />
        <Route
          exact
          path='signup'
          element={<Signup showAlert={props.showAlert} />}
        />
        <Route path='home' element={<Home />}>
          <Route path='add' element={<AddEmployee />} />
          <Route path='list' element={<EmployeeList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default ReactRoutes;
