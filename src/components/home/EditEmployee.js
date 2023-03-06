import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillEdit } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import format from 'date-fns/format';

import 'react-datepicker/dist/react-datepicker.css';
import EmployeeContext from '../../context/employee/EmployeeContext';
import UserContext from '../../context/user/UesrContext';

const EditEmployee = (props) => {
  const context = useContext(EmployeeContext);
  const { updateEmployeeData } = context;

  const userContext = useContext(UserContext);
  const { setSpinner } = userContext;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { employeeDetails } = props;

  const [addEmpForm, setEmpForm] = useState({
    empNo: employeeDetails.emp_no,
    birthDate: new Date(employeeDetails.birth_date),
    firstName: employeeDetails.first_name,
    lastName: employeeDetails.last_name,
    gender: employeeDetails.gender,
    hireDate: new Date(employeeDetails.hire_date),
  });

  const onFieldChange = (e) => {
    setEmpForm({ ...addEmpForm, [e.target.name]: e.target.value });
  };

  const onBirthDateChange = (fieldName, date) => {
    setEmpForm({ ...addEmpForm, [fieldName]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    setSpinner(true);
    const payload = {
      emp_no: parseInt(addEmpForm.empNo),
      birth_date: format(new Date(addEmpForm.birth_date), 'yyyy-MM-dd'),
      first_name: addEmpForm.firstName,
      last_name: addEmpForm.lastName,
      gender: addEmpForm.gender,
      hire_date: format(new Date(addEmpForm.hire_date), 'yyyy-MM-dd'),
    };
    updateEmployeeData(payload);
    setSpinner(false);
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    readOnly
                  />
                </div>
              </div>
              <div className='mb-4 row'>
                <label htmlFor='birthDate' className='col-sm-2 col-form-label'>
                  Birthdate
                </label>
                <div className='col-sm-9'>
                  <DatePicker
                    selected={new Date(addEmpForm.birthDate)}
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
                      checked={addEmpForm.gender === 'M'}
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
                      checked={addEmpForm.gender === 'F'}
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
                {/* <button className='btn btn-primary' type='submit'>
                  Submit
                </button>
                <button
                  type='button'
                  className='btn btn-default mx-4'
                  onClick={() => setEmpForm({ ...addEmpFormInitialize })}
                >
                  Reset
                </button> */}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditEmployee;
