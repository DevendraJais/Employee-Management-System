import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { view: 'tile', selectedEmployee: null, editingEmployee: null, isAddingEmployee: false },
  reducers: {
    setView: (state, action) => { state.view = action.payload; },
    setSelectedEmployee: (state, action) => { state.selectedEmployee = action.payload; },
    setEditingEmployee: (state, action) => { state.editingEmployee = action.payload; },
    setIsAddingEmployee: (state, action) => { state.isAddingEmployee = action.payload; },
  },
});

export const { setView, setSelectedEmployee, setEditingEmployee, setIsAddingEmployee } = uiSlice.actions;
export default uiSlice.reducer;
