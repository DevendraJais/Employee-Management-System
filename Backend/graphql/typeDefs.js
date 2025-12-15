export const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    age: Int
    class: String
    subjects: [String]
    attendance: Int
    flagged: Boolean 
  }

  input EmployeeInput {
    name: String!
    age: Int
    class: String
    subjects: [String]
    attendance: Int
  }

  enum SortBy {
    NAME_ASC
    NAME_DESC
    AGE_ASC
    AGE_DESC
    ATTENDANCE_ASC
    ATTENDANCE_DESC
  }

  type AuthPayload {
    token: String!
    role: String!
  }

  type Query {
    employees(limit: Int, offset: Int, sortBy: SortBy): [Employee]
    employee(id: ID!): Employee
    totalEmployees: Int
  }

  type Mutation {
    flagEmployee(id: ID!): Employee
    addEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Employee
    login(username: String!, password: String!): AuthPayload
  }
`;
