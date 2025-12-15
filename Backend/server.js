import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { connectDB } from './config/db.js';
import User from './models/User.js';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startServer = async () => {
  //  Connect MongoDB
  await connectDB();

  //  Seed default users (ONLY ONCE)
  const existingAdmin = await User.findOne({ username: 'admin' });

  if (!existingAdmin) {
    await User.create([
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'employee', password: 'employee123', role: 'employee' }
    ]);
    console.log('Default users created');
  }

  // Start GraphQL server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const auth = req.headers.authorization;
      if (!auth) return {};

      try {
        const token = auth.split(' ')[1];
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        return {};
      }
    }
  });

  console.log(`GraphQL running at ${url}`);
};

startServer();
