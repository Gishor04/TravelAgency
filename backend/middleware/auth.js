import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_travel_2026_luxury_secure_token_987654321';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    try {
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      req.user = null;
    }

    if (!req.user) {
      req.user = {
        _id: decoded.id,
        id: decoded.id,
        role: decoded.role || 'user',
        name: 'Globevia Traveler',
        email: 'traveler@globeviatravel.com'
      };
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token verification failed' });
  }
};

export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (e) {
        req.user = null;
      }
      if (!req.user) {
        req.user = {
          _id: decoded.id,
          id: decoded.id,
          role: decoded.role || 'user',
          name: 'Globevia Traveler',
          email: 'traveler@globeviatravel.com'
        };
      }
    } catch (err) {
      req.user = null;
    }
  }
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'none'}' is not authorized`
      });
    }
    next();
  };
};
