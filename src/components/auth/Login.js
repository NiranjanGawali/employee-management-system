import React, { useContext, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/user/UesrContext';
// import { loginMethod } from './../../app/features/user/userSlice';

const Login = (props) => {
  // React redux toolkit parameter
  // const userState = useSelector((state) => state.user.response);
  // const dispatch = useDispatch();

  // ------------------------------------------------------------------------------------------------
  const context = useContext(userContext);
  const { login, setSpinner } = context;

  let navigation = useNavigate();

  const loginFormInitialize = {
    email: '',
    password: '',
  };

  const [loginForm, setLoginForm] = useState(loginFormInitialize);

  const onFieldChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    // Using Context API
    try {
      let response = await login(loginForm);
      console.log(response);
      if (response.status) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        navigation('/home/list');
      }
      props.showAlert('Login Successfull !!!', 'success', 'Success');
      setSpinner(false);
    } catch (err) {
      const errData = err.response.data;
      props.showAlert(errData.message, 'danger', 'Error');
      setSpinner(false);
    }

    // Using redux toolkit
    /*
    try {
      dispatch(loginMethod(loginForm))
        .unwrap()
        .then((response) => {
          if (response.status) {
            localStorage.setItem('token', JSON.stringify(response.data.token));
            navigation('/home/list');
          }
          props.showAlert('Login Successfull !!!', 'success', 'Success');
          setSpinner(false);
        })
        .catch((err) => {
          const errData = err.response.data;
          props.showAlert(errData.message, 'danger', 'Error');
          setSpinner(false);
        });
    } catch (err) {
      console.log(err);
      const errData = err.response.data;
      props.showAlert(errData.message, 'danger', 'Error');
      setSpinner(false);
    }
    */
  };

  return (
    <div className='row'>
      <div className='offset-md-3 col-md-6'>
        <div className='login-window'>
          <h3 className='text-center'>Login Form</h3>
          <form onSubmit={handleSubmit}>
            <div className='mb-4 row text-center'>
              <label htmlFor='staticEmail' className='col-sm-2 col-form-label'>
                Email
              </label>
              <div className='col-sm-9'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  onChange={onFieldChange}
                />
              </div>
            </div>
            <div className='mb-4 row text-center'>
              <label
                htmlFor='inputPassword'
                className='col-sm-2 col-form-label'
              >
                Password
              </label>
              <div className='col-sm-9'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  onChange={onFieldChange}
                />
              </div>
            </div>
            <div className='text-center'>
              <button className='btn btn-primary'>Submit</button>
              <button
                type='button'
                className='btn btn-success mx-4'
                onClick={() => navigation('/')}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
