import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../../http-common';

const initialState = {
  response: { data: {}, message: '', status: false, statusCode: 0 },
};

// Login method
export const loginMethod = createAsyncThunk('user/login', async (payload) => {
  const output = await http.post('/user/login', payload);
  return output.data;
});

// Signup method
export const signupMethod = createAsyncThunk('user/signup', async (payload) => {
  const output = await http.post('/user/signup', payload);
  console.log(output);
  return output.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(loginMethod.pending, (state, action) => {
    //   console.log('PENDING');
    //   console.log('STATE => ', state);
    //   console.log('ACTION => ', action);
    // });
    builder.addCase(loginMethod.fulfilled, (state, action) => {
      const { payload } = action;
      state.response = payload.data;
    });
    // builder.addCase(loginMethod.rejected, (state, action) => {
    //   console.log('REJECTED');
    //   console.log('STATE => ', state);
    //   console.log('ACTION => ', action);
    // });
    builder.addCase(signupMethod.fulfilled, (state, action) => {
      const { payload } = action;
      state.response = payload.data;
    });
  },
});

export const sliceData = {
  ...userSlice.actions,
};
const { reducer } = userSlice;

export default reducer;
