// jwtMiddleware.js
const jwt = require('jsonwebtoken');

// Secret key for signing and verifying JWT tokens
const secretKey = 'marandmorapp-secret-key'; // Replace with your actual secret key

// Middleware to create a JWT token
function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Adjust the expiration time as needed
}

function verifyAccessToken(token) {
  const secret = 'marandmorapp-secret-key';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Middleware to verify a JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
}

module.exports = { createToken, verifyToken };
