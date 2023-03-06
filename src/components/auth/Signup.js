import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupMethod } from '../../app/features/user/userSlice';
import UserContext from '../../context/user/UesrContext';

const Signup = (props) => {
  // React redux toolkit parameter
  const userState = useSelector((state) => state.user.response);
  const dispatch = useDispatch();

  //////////////////////////////////////////////////

  const context = useContext(UserContext);
  const { signup, setSpinner } = context;
  let navigation = useNavigate();

  const signupFormInitialize = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [signupForm, setSignupForm] = useState(signupFormInitialize);

  const onFieldChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();
    // Using Context API
    /*
    try {
      let result = await signup(signupForm);
      if (result.status) {
        navigation('/login');
      }
      setSpinner(false);
    } catch (err) {
      const errData = err.response.data;
      props.showAlert(errData.message, 'danger', 'Error');
      setSpinner(false);
    }
    */

    // Using redux toolkit
    try {
      dispatch(signupMethod(signupForm))
        .unwrap()
        .then((result) => {
          if (result.status) {
            navigation('/login');
          }
          setSpinner(false);
        })
        .catch((err) => {
          const errData = err.response.data;
          props.showAlert(errData.message, 'danger', 'Error');
          setSpinner(false);
        });
    } catch (err) {
      const errData = err.response.data;
      props.showAlert(errData.message, 'danger', 'Error');
      setSpinner(false);
    }
  };

  return (
    <div className='row'>
      {/* login-window */}

      <div className='offset-md-3 col-md-6'>
        <div className='login-window'>
          <h3 className='text-center'>Signup Form</h3>
          <form onSubmit={handleSubmit}>
            <div className='mb-4 row text-center'>
              <label htmlFor='name' className='col-sm-2 col-form-label'>
                Name
              </label>
              <div className='col-sm-9'>
                <input
                  type='name'
                  className='form-control'
                  id='name'
                  name='name'
                  onChange={onFieldChange}
                />
              </div>
            </div>
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
            <div className='mb-4 row text-center'>
              <label
                htmlFor='confirmPassword'
                className='col-sm-2 col-form-label'
              >
                Confirm Password
              </label>
              <div className='col-sm-9'>
                <input
                  type='password'
                  className='form-control'
                  id='confirmPassword'
                  name='confirmPassword'
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

export default Signup;
