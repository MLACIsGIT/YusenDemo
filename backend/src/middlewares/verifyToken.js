import Token from '../repository/Token';

export function verifyToken(req, res, next) {
  try {
    req.verified = Token.verify(req.headers.token);
    next();
  } catch (e) {
      const error = new Error('invalid token');
      error.status = 403;
      throw error;
  }
}
