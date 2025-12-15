import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployeesApi, updateEmployeeApi, flagEmployeeApi, deleteEmployeeApi, addEmployeeApi, fetchEmployeeCountApi } from '../api/employeeApi';

export const fetchEmployees = createAsyncThunk('employees/fetch', async () => {
  return await fetchEmployeesApi();
});

export const fetchTotalCount = createAsyncThunk('employees/count', async () => {
  return await fetchEmployeeCountApi();
});

export const updateEmployee = createAsyncThunk('employees/update', async ({ id, input }) => {
  return await updateEmployeeApi(id, input);
});

export const flagEmployee = createAsyncThunk('employees/flag', async (id) => {
  return await flagEmployeeApi(id);
});

export const deleteEmployee = createAsyncThunk('employees/delete', async (id) => {
  return await deleteEmployeeApi(id);
});

export const addEmployee = createAsyncThunk('employees/add', async (input) => {
  return await addEmployeeApi(input);
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { list: [], totalCount: 0, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(flagEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(flagEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          // Merge the updated data with existing data to ensure all fields are preserved
          state.list[index] = { ...state.list[index], ...action.payload };
        }
      })
      .addCase(flagEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted employee from the list
        state.list = state.list.filter(e => e.id !== action.payload.id);
        state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTotalCount.fulfilled, (state, action) => {
        state.totalCount = action.payload;
      });
  },
});

export default employeeSlice.reducer;
