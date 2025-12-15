import { useDispatch } from 'react-redux';
import { flagEmployee, deleteEmployee } from '../redux/employeeSlice';
import { setSelectedEmployee, setEditingEmployee } from '../redux/uiSlice';

export default function EmployeeTile({ employee }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      try {
        await dispatch(deleteEmployee(employee.id));
      } catch (error) {
        alert('Delete failed: ' + error.message);
      }
    }
  };

  return (
    <div
      className={`tile ${employee.flagged ? 'flagged' : ''}`}
      onClick={() => dispatch(setSelectedEmployee(employee))}
    >
      <h3>{employee.name}</h3>
      <p>Age: {employee.age}</p>
      <p>Class: {employee.class}</p>

      <div className="tile-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(flagEmployee(employee.id));
          }}
        >
          {employee.flagged ? 'Unflag' : 'Flag'}
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setEditingEmployee(employee));
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
