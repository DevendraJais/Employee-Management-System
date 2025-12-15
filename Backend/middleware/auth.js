import jwt from 'jsonwebtoken';

export const authContext = ({ req }) => {
  const auth = req.headers.authorization;
  if (!auth) return {};

  try {
    const token = auth.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return {};
  }
};
