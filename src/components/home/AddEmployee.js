import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EmployeeContext from '../../context/employee/EmployeeContext';
import UserContext from '../../context/user/UesrContext';

const AddEmployee = () => {
  const context = useContext(EmployeeContext);
  const { addEmployeeData } = context;

  const userContext = useContext(UserContext);
  const { setSpinner } = userContext;

  let navigation = useNavigate();

  const addEmpFormInitialize = {
    empNo: 0,
    birthDate: null,
    firstName: '',
    lastName: '',
    gender: '',
    hireDate: null,
  };

  const [addEmpForm, setEmpForm] = useState(addEmpFormInitialize);

  const onFieldChange = (e) => {
    e.preventDefault();
    setEmpForm({ ...addEmpForm, [e.target.name]: e.target.value });
  };

  const onBirthDateChange = (fieldName, date) => {
    setEmpForm({ ...addEmpForm, [fieldName]: date });
  };

  const handleSubmit = (e) => {
    setSpinner(true);
    e.preventDefault();
    const payload = {
      emp_no: parseInt(addEmpForm.empNo),
      birth_date: format(new Date(addEmpForm.birthDate), 'yyyy-MM-dd'),
      first_name: addEmpForm.firstName,
      last_name: addEmpForm.lastName,
      gender: addEmpForm.gender,
      hire_date: format(new Date(addEmpForm.hireDate), 'yyyy-MM-dd'),
    };
    addEmployeeData(payload);
    setSpinner(false);
    navigation('/home/list');
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='offset-md-3 col-md-6'>
          <h3 className='text-center'>Add Employee</h3>
          <form onSubmit={handleSubmit}>
            <div className='field-form'>
              <div className='mb-4 row'>
                <label htmlFor='empNo' className='col-sm-2 col-form-label'>
                  Employee Number
                </label>
                <div className='col-sm-9'>
                  <input
                    type='number'
                    className='form-control'
                    id='empNo'
                    name='empNo'
                    onChange={onFieldChange}
                    value={addEmpForm.empNo}
                    required
                  />
                </div>
              </div>
              <div className='mb-4 row'>
                <label htmlFor='birthDate' className='col-sm-2 col-form-label'>
                  Birthdate
                </label>
                <div className='col-sm-9'>
                  <DatePicker
                    selected={addEmpForm.birthDate}
                    onChange={(date) => onBirthDateChange('birthDate', date)}
                    value={addEmpForm.birthDate}
                    required
                  />
                </div>
              </div>
              <div className='mb-4 row'>
                <label htmlFor='firstName' className='col-sm-2 col-form-label'>
                  Firstname
                </label>
                <div className='col-sm-9'>
                  <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    name='firstName'
                    onChange={onFieldChange}
                    value={addEmpForm.firstName}
                    required
                  />
                </div>
              </div>
              <div className='mb-4 row'>
                <label htmlFor='lastName' className='col-sm-2 col-form-label'>
                  Lastname
                </label>
                <div className='col-sm-9'>
                  <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    name='lastName'
                    onChange={onFieldChange}
                    value={addEmpForm.lastName}
                    required
                  />
                </div>
              </div>
              <div className='mb-4 row text-center'>
                <label htmlFor='gender' className='col-sm-2 col-form-label'>
                  Gender
                </label>
                <div className='col-sm-9 row'>
                  <div className='col-sm-6'>
                    <label htmlFor='male' className='form-check-label'>
                      Male
                    </label>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='gender'
                      id='male'
                      value='M'
                      onChange={onFieldChange}
                      required
                    />
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor='female' className='form-check-label'>
                      Female
                    </label>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='gender'
                      id='female'
                      value='F'
                      onChange={onFieldChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='mb-4 row'>
                <label htmlFor='hireDate' className='col-sm-2 col-form-label'>
                  Hiredate
                </label>
                <div className='col-sm-9'>
                  <DatePicker
                    selected={addEmpForm.hireDate}
                    onChange={(date) => onBirthDateChange('hireDate', date)}
                    required
                  />
                </div>
              </div>
              <div className='text-center'>
                <button className='btn btn-primary' type='submit'>
                  Submit
                </button>
                <button
                  type='button'
                  className='btn btn-default mx-4'
                  onClick={() => setEmpForm({ ...addEmpFormInitialize })}
                >
                  Reset
                </button>
                <button
                  type='button'
                  className='btn btn-success mx-4'
                  onClick={() => navigation('/home/list')}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
