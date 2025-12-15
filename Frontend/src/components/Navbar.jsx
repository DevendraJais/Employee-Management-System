import { useDispatch, useSelector } from 'react-redux';
import { setView, setIsAddingEmployee } from '../redux/uiSlice';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar() {
  const dispatch = useDispatch();
  const { totalCount } = useSelector(state => state.employees);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <HamburgerMenu />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="navbar-brand">Employee Management System</span>
          <span style={{ fontSize: '0.8rem', color: '#ccc' }}>Total Employees: {totalCount}</span>
        </div>
      </div>

      <div className="nav-actions">
        <button className="btn btn-secondary" onClick={() => dispatch(setView('tile'))}>Tile View</button>
        <button className="btn btn-secondary" onClick={() => dispatch(setView('grid'))}>Grid View</button>
        <button className="btn btn-primary" onClick={() => dispatch(setIsAddingEmployee(true))}>Add Employee</button>
      </div>
    </nav>
  );
}
