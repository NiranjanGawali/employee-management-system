import React from 'react';
import { Link } from 'react-router-dom';
import background from './../images/front-img.jpg';

const Auth = () => {
  const myStyle = {
    backgroundImage: `url(${background})`,
    width: '100vw',
    height: '100vh',
    border: '3px',
    boxSizing: 'border-box',
  };
  return (
    <div className='landing-wrapper' style={myStyle}>
      <div className='front-page mt-4'>
        <div>
          <Link className='btn btn-primary mx-5' to='/login'>
            Login
          </Link>
          <Link className='btn btn-primary mx-5' to='/signup'>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
