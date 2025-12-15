import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, fetchTotalCount } from './redux/employeeSlice';
import { setView, setIsAddingEmployee } from './redux/uiSlice';
import Navbar from './components/Navbar';
import EmployeeGrid from './components/EmployeeGrid';
import EmployeeTable from './components/EmployeeTable';
import EmployeePopup from './components/EmployeePopup';
import EditEmployeeModal from './components/EditEmployeeModal';
import AddEmployeeModal from './components/AddEmployeeModal';
import Login from './components/Login';

export default function App() {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.employees);
  const { view, selectedEmployee, editingEmployee, isAddingEmployee } = useSelector(state => state.ui);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      dispatch(fetchEmployees());
      dispatch(fetchTotalCount());
    }
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Navbar />

      {view === 'tile'
        ? <EmployeeGrid employees={list} />
        : <EmployeeTable employees={list} />
      }

      <EmployeePopup employee={selectedEmployee} />
      <EditEmployeeModal employee={editingEmployee} />
      {isAddingEmployee && <AddEmployeeModal />}
    </>
  );
}
