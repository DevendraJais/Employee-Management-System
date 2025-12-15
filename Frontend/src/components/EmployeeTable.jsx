import { useDispatch } from 'react-redux';
import { flagEmployee, deleteEmployee } from '../redux/employeeSlice';
import { setEditingEmployee } from '../redux/uiSlice';

export default function EmployeeTable({ employees }) {
  const dispatch = useDispatch();
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Class</th>
          <th>Subjects</th>
          <th>Attendance</th>
          <th>Flagged</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id} className={emp.flagged ? 'flagged-row' : ''}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.age}</td>
            <td>{emp.class}</td>
            <td>{emp.subjects.join(', ')}</td>
            <td>{emp.attendance}</td>
            <td>{emp.flagged ? 'Yes' : 'No'}</td>
            <td>-</td>
            <td>-</td>
            <td>
              <div className="table-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => dispatch(flagEmployee(emp.id))}
                >
                  {emp.flagged ? 'Unflag' : 'Flag'}
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => dispatch(setEditingEmployee(emp))}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (window.confirm(`Delete ${emp.name}?`)) {
                      dispatch(deleteEmployee(emp.id));
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
