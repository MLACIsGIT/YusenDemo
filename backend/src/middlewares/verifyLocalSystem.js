export function verifyLocalSystem(req, res, next) {
  try {
    if (process.env.LOCAL_SYSTEM_IP && process.env.LOCAL_SYSTEM_IP !== '*') {
      if (process.env.LOCAL_SYSTEM_IP !== req.ip)
        throw new Error('Forbidden', 403);
    }
    next();
  } catch (e) {
    e.httpCode = 403;
    next(e);
  }
}
