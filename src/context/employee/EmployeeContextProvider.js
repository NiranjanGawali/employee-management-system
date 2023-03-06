import { useState } from 'react';
import EmployeeContext from './EmployeeContext';
import EmployeeService from '../../services/EmployeeService';

const EmployeeContextProvider = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [count, setCount] = useState(0);

  const getEmployeeData = async (pageNo) => {
    console.log('In getEmployeeData...................');
    const response = await EmployeeService.getEmployeeData(pageNo);
    const empData = await response.data.data;
    const allPageCount = await response.data.count;
    setEmployeeData(empData);
    setCount(allPageCount);
  };

  const addEmployeeData = async (payload) => {
    console.log('In addEmployeeData...................');
    const response = await EmployeeService.addEmployeeData(payload);
    const result = await response.data.data;
    return result;
  };

  const updateEmployeeData = async (payload) => {
    console.log('In updateEmployeeData...................');
    console.log(payload);
    const response = await EmployeeService.updateEmployeeData(payload);
    const result = await response.data;
    if (result.status) {
      const updatedEmpList = employeeData.map((e) =>
        e.emp_no === payload.emp_no ? (e = payload) : e
      );
      setEmployeeData(updatedEmpList);
    }
  };

  const deleteEmployeeData = async (empNo, pageNo) => {
    console.log('In deleteEmployeeData...................');
    const response = await EmployeeService.deleteEmployeeData(empNo);
    const result = await response.data;
    if (result.status) {
      // setEmployeeData([...employeeData.filter((e) => e.emp_no !== empNo)]);
      getEmployeeData(pageNo);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employeeData,
        setEmployeeData,
        getEmployeeData,
        addEmployeeData,
        updateEmployeeData,
        deleteEmployeeData,
        count,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
