import http from '../http-common';

const login = (payload) => {
  return http.post('/user/login', payload);
};

const signup = (payload) => {
  return http.post('/user/signup', payload);
};

const UserService = {
  login,
  signup,
};

export default UserService;
