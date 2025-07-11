const isAdmin = (req, res, next) => {
  if (req.headers['x-admin'] === 'true') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { isAdmin };

