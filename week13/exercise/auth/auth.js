const jwt = require('jsonwebtoken');
const SECRET_KEY = 'fmijs';

const login = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15s' });
    res.cookie('token', token, { httpOnly: true });
}

const tokenDecode = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        next();
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded
    } finally {
        next();
    }
};

const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
  } catch (err) {  
    res.clearCookie('token');
    res.status(401).json({ message: 'Invalid token. Should log again.' });
  }
};

module.exports = { login, tokenDecode, authenticate, SECRET_KEY };