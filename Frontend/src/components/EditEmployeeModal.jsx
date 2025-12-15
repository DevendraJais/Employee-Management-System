import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../redux/employeeSlice';
import { setEditingEmployee } from '../redux/uiSlice';

export default function EditEmployeeModal({ employee }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    age: employee?.age || '',
    class: employee?.class || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        age: employee.age || '',
        class: employee.class || ''
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert age to integer for GraphQL
      const processedFormData = {
        ...formData,
        age: parseInt(formData.age, 10)
      };

      const result = await dispatch(updateEmployee({ id: employee.id, input: processedFormData }));
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(setEditingEmployee(null));
        window.location.reload();
      } else {
        alert(result.error?.message || 'Update failed');
      }
    } catch (error) {
      alert('Update failed: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    dispatch(setEditingEmployee(null));
  };

  if (!employee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
