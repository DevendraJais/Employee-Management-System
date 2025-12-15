import Employee from '../models/Employee.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const resolvers = {
  Query: {
    employees: async (_, { limit = 10, offset = 0, sortBy }) => {
      const sortMap = {
        NAME_ASC: { name: 1 },
        NAME_DESC: { name: -1 },
        AGE_ASC: { age: 1 },
        AGE_DESC: { age: -1 },
        ATTENDANCE_ASC: { attendance: 1 },
        ATTENDANCE_DESC: { attendance: -1 }
      };

      return Employee.find()
        .sort(sortMap[sortBy] || {})
        .skip(offset)
        .limit(limit);
    },

    employee: (_, { id }) => Employee.findById(id),

    totalEmployees: async () => Employee.countDocuments()
  },
  Mutation: {
    addEmployee: async (_, { input }, { role }) => {
      if (role !== 'admin') {
        throw new Error('Admin only');
      }
      return Employee.create(input);
    },

    updateEmployee: async (_, { id, input }, { role }) => {
      if (role !== 'admin') {
        throw new Error('Admin only');
      }
      return Employee.findByIdAndUpdate(id, input, { new: true });
    },

    //flagEmployee
    flagEmployee: async (_, { id }, context) => {
      if (context.role !== 'admin') {
        throw new Error('Admin only');
      }

      const emp = await Employee.findById(id);
      if (!emp) throw new Error('Employee not found');

      emp.flagged = !emp.flagged; // toggle
      return emp.save();
    },

    deleteEmployee: async (_, { id }, context) => {
      if (context.role !== 'admin') {
        throw new Error('Admin only');
      }

      const emp = await Employee.findByIdAndDelete(id);
      if (!emp) throw new Error('Employee not found');

      return emp;
    },


    login: async (_, { username, password }) => {
      const user = await User.findOne({ username, password });
      if (!user) throw new Error('Invalid credentials');

      return {
        token: jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '4h' }
        ),
        role: user.role
      };
    }
  }


};
