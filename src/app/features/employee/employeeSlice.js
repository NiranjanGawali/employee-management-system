import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../../../http-common';

const initialState = {
  response: { data: [], message: '', status: false, statusCode: 0, count: 0 },
};

export const getEmployee = createAsyncThunk(
  'emp/getEmployee',
  async (pageNo) => {
    console.log('In getEmployee method ...');
    const output = await http.get(`/employee/getEmployeeData?pageNo=${pageNo}`);
    console.log('OUTPUT => ', output);
    return output.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  'emp/deleteEmployee',
  async (empNo, pageNo) => {
    console.log('In deleteEmployee method ...');
    const output = await http.delete(
      `/employee/deleteEmployee?emp_no=${empNo}`
    );
    console.log('OUTPUT => ', output);
    if (output.data.status) {
      // dispatch(getEmployee(pageNo));
    }
    return { empNo, pageNo, status: true };
  }
);

const empSlice = createSlice({
  name: 'emp',
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(getEmployee.pending, (state) => {
    //   state.data = [];
    // });
    builder.addCase(getEmployee.fulfilled, (state, action) => {
      const { payload } = action;
      console.log('in fullfilled');
      console.log(payload);
      state.data = payload.data;
      state.count = payload.count;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      const { payload } = action;
      console.log('in delete fullfilled');
      console.log(payload);
      state.status = payload.status;
      state.data = state.data.filter((e) => e.emp_no !== payload.empNo);
    });
  },
});

export const sliceData = {
  ...empSlice.actions,
};
const { reducer } = empSlice;

export default reducer;
