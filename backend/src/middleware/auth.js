const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(requireAdmin = false) {
  return (req, res, next) => {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ error: 'no token' });
    const token = h.replace(/^Bearer\s+/, '');
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (requireAdmin && !payload.is_admin) return res.status(403).json({ error: 'admin required' });
      req.user = payload;
      next();
    } catch (e) { return res.status(401).json({ error: 'invalid token' }); }
  }
}
