import EmployeeTile from './EmployeeTile';

export default function EmployeeGrid({ employees }) {
  return (
    <div className="grid">
      {employees.map(emp => (
        <EmployeeTile key={emp.id} employee={emp} />
      ))}
    </div>
  );
}
