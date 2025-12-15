import { useDispatch } from 'react-redux';
import { setSelectedEmployee } from '../redux/uiSlice';

export default function EmployeePopup({ employee }) {
  const dispatch = useDispatch();

  if (!employee) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h2>
            <div className="employee-avatar">
              {employee.name.charAt(0).toUpperCase()}
            </div>
            {employee.name}
          </h2>
        </div>
        
        <div className="popup-body">
          <div className="popup-info-grid">
            <div className="popup-info-item">
              <span className="popup-info-label">Age</span>
              <span className="popup-info-value">{employee.age}</span>
            </div>
            <div className="popup-info-item">
              <span className="popup-info-label">Class</span>
              <span className="popup-info-value">{employee.class}</span>
            </div>
            <div className="popup-info-item">
              <span className="popup-info-label">Subjects</span>
              <span className="popup-info-value">{employee.subjects.join(', ')}</span>
            </div>
            <div className="popup-info-item">
              <span className="popup-info-label">Attendance</span>
              <span className="popup-info-value">{employee.attendance}%</span>
            </div>
            <div className={`popup-info-item ${employee.flagged ? 'flagged' : ''}`}>
              <span className="popup-info-label">Status</span>
              <span className="popup-info-value">{employee.flagged ? 'Flagged' : 'Active'}</span>
            </div>
          </div>
        </div>
        
        <div className="popup-footer">
          <button className="popup-close-btn" onClick={() => dispatch(setSelectedEmployee(null))}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
