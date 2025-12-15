const GRAPHQL_URL = 'https://employee-management-system-7twn.onrender.com/'; // backend

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNlYWY0NjI5MWEyZDA4NzFjNTk5MGMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjU3MjM2OTQsImV4cCI6MTc2NTczODA5NH0.324KM4_H_JVt-CgWgbxCxny3HlX4q3X5Duo_QYzrMws'; //admin token

async function callGraphQL(query, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  return json.data;
}

export const fetchEmployeesApi = async () => {
  const query = `
    query { employees(limit: 20) { id name age class subjects attendance flagged } }
  `;
  const data = await callGraphQL(query);
  return data.employees;
};

export const updateEmployeeApi = async (id, input) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Please login to update employees');
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation($id: ID!, $input: EmployeeInput!) {
          updateEmployee(id: $id, input: $input) { id name age class subjects attendance flagged }
        }
      `,
      variables: { id, input }
    })
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.updateEmployee;
};

export const flagEmployeeApi = async (id) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Please login to flag employees');
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation($id: ID!) {
          flagEmployee(id: $id) { id flagged }
        }
      `,
      variables: { id }
    })
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.flagEmployee;
};

export const deleteEmployeeApi = async (id) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Please login to delete employees');
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation($id: ID!) {
          deleteEmployee(id: $id) { id name age class }
        }
      `,
      variables: { id }
    })
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.deleteEmployee;
};

export const addEmployeeApi = async (input) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Please login to add employees');
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation($input: EmployeeInput!) {
          addEmployee(input: $input) { id name age class subjects attendance flagged }
        }
      `,
      variables: { input }
    })
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.addEmployee;
};
export const fetchEmployeeCountApi = async () => {
  const query = `
    query { totalEmployees }
  `;
  const data = await callGraphQL(query);
  return data.totalEmployees;
};
