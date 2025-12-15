import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/employeeSlice';
import { setIsAddingEmployee } from '../redux/uiSlice';

export default function AddEmployeeModal() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        class: '',
        subjects: '',
        attendance: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const processedFormData = {
                ...formData,
                age: parseInt(formData.age, 10),
                attendance: parseInt(formData.attendance, 10),
                subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean)
            };

            const result = await dispatch(addEmployee(processedFormData));
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(setIsAddingEmployee(false));
            } else {
                alert(result.error?.message || 'Add failed');
            }
        } catch (error) {
            alert('Add failed: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        dispatch(setIsAddingEmployee(false));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Employee</h2>
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
                    <div className="form-group">
                        <label htmlFor="subjects">Subjects (comma separated):</label>
                        <input
                            type="text"
                            id="subjects"
                            name="subjects"
                            value={formData.subjects}
                            onChange={handleChange}
                            placeholder="Math, Science, History"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="attendance">Attendance (%):</label>
                        <input
                            type="number"
                            id="attendance"
                            name="attendance"
                            value={formData.attendance}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
