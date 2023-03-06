import http from './../http-common';

const getEmployeeData = (pageNo) => {
  return http.get(`/employee/getEmployeeData?pageNo=${pageNo}`);
};

const addEmployeeData = (payload) => {
  return http.post('/employee/addEmployee', payload);
};
const updateEmployeeData = (payload) => {
  return http.post('/employee/updateEmployee', payload);
};

const deleteEmployeeData = (empNo) => {
  return http.delete(`/employee/deleteEmployee?emp_no=${empNo}`);
};

const EmployeeService = {
  getEmployeeData,
  addEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
};

export default EmployeeService;
