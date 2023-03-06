import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEmployee } from '../../app/features/employee/employeeSlice';
import EmployeeContext from '../../context/employee/EmployeeContext';
import UserContext from '../../context/user/UesrContext';
import EmployeeDetails from './EmployeeDetails';

const EmployeeList = () => {
  // React redux toolkit
  const empState = useSelector((state) => state.emp);
  const dispatch = useDispatch();

  // ------------------------------------------------------------------------------------------------
  const context = useContext(EmployeeContext);
  const { employeeData, getEmployeeData, count } = context;

  const userContext = useContext(UserContext);
  const { setSpinner } = userContext;

  const navigation = useNavigate();
  const [pageNo, setPageNo] = useState(1);

  // Below mentioned logic is for context API
  useEffect(() => {
    setSpinner(true);
    /*
    if (localStorage.getItem('token')) {
      getEmployeeData(pageNo);
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    } else {
      navigation('/login');
      setSpinner(false);
    }
    */

    if (localStorage.getItem('token')) {
      dispatch(getEmployee(pageNo));
      console.log('IN USEEFFECT....');
      console.log(empState);
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    } else {
      navigation('/login');
      setSpinner(false);
    }

    // eslint-disable-next-line
  }, [employeeData]);

  const onPageChanged = (paginationActivity) => {
    if (paginationActivity === 'next') {
      setPageNo(pageNo + 1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <h3 className='text-center'>Employee List</h3>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Emp no.</th>
                <th scope='col'>Firstname</th>
                <th scope='col'>Lastname</th>
                <th scope='col'>Gender</th>
                <th scope='col'>Birthday</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {empState?.data?.map((singleEmp, index) => {
                return (
                  <tr key={singleEmp.emp_no}>
                    <EmployeeDetails
                      employeeDetails={singleEmp}
                      empIndex={index}
                      pageNo={pageNo}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='paginationData'>
          <h6>Page : {pageNo}</h6>
          <div className='prevbtn'>
            <button
              disabled={empState.count <= 1}
              className='btn btn-success'
              onClick={() => onPageChanged('prev')}
            >
              Prev
            </button>
          </div>
          <div className='nextbtn'>
            <button
              disabled={pageNo >= empState.count}
              className='btn btn-primary'
              onClick={() => onPageChanged('next')}
            >
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeList;
