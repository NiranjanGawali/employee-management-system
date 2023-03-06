import React, { useContext } from 'react';
import Moment from 'react-moment';
import { AiFillDelete } from 'react-icons/ai';
import EditEmployee from './EditEmployee';
import EmployeeContext from '../../context/employee/EmployeeContext';
import { useDispatch } from 'react-redux';
import {
  deleteEmployee,
  getEmployee,
} from '../../app/features/employee/employeeSlice';

const EmployeeDetails = (props) => {
  // Using context API
  const context = useContext(EmployeeContext);
  const { deleteEmployeeData } = context;

  // Using redux toolkit
  // const userState = useSelector((state) => state.user.status);
  const dispatch = useDispatch();

  const deleteEmp = (emp_no, pageNo) => {
    console.log('In deleteEmp');
    dispatch(deleteEmployee(emp_no, pageNo))
      .unwrap()
      .then((res) => {
        console.log('RES');
        console.log(res);
        if (res.status) {
          dispatch(getEmployee(pageNo));
        }
      });
  };

  return (
    <>
      <td>{props.employeeDetails.emp_no}</td>
      <td>{props.employeeDetails.first_name}</td>
      <td>{props.employeeDetails.last_name}</td>
      <td>{props.employeeDetails.gender}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{props.employeeDetails.birth_date}</Moment>
      </td>
      <td>
        {/* <AiFillEdit onClick={() => props.editEmpoyee(props.employeeDetails)} />{' '} */}
        <EditEmployee
          employeeDetails={props.employeeDetails}
          empIndex={props.empIndex}
        />
        |
        <AiFillDelete
          onClick={() => {
            if (window.confirm('Are you sure want to delete ?')) {
              // deleteEmployeeData(props.employeeDetails.emp_no, props.pageNo);
              deleteEmp(props.employeeDetails.emp_no, props.pageNo);
            }
          }}
        />
      </td>
    </>
  );
};

export default EmployeeDetails;
