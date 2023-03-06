import React, { useState } from 'react';
import UserContext from './UesrContext';
import UserService from '../../services/UserService';

const UserContextProvider = (props) => {
  const userInfo = {};
  const [userData, setUserdata] = useState(userInfo);

  const [spinner, setSpinner] = useState(false);

  const login = async (payload) => {
    try {
      console.log('Login Payload => ', payload);
      const response = await UserService.login(payload);
      const result = response.data;
      setUserdata(result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (payload) => {
    try {
      console.log('Signup Payload => ', payload);
      const response = await UserService.signup(payload);
      const result = response.data;
      console.log('Signup Response -> ', result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, login, signup, spinner, setSpinner }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
