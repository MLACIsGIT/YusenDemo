import Token from '../repository/Token';

export function verifyTokenSA(req, res, next) {
  try {
    req.verified = Token.verify(req.headers.token);
    if (req.verified.userLevel !== 'OWNER_SA') {
        throw new Error('invalid token');
    }
    next();
  } catch (e) {
      const error = new Error('invalid token');
      error.status = 403;
      throw error;
  }
}
