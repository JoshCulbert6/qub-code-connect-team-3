function requireLogin(allowedRoles = []) {
  return (req, res, next) => {

    if (!req.session || !req.session.user) {
      return res.redirect('/auth/login');
    }

    const user = req.session.user;

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      return res.status(403).send('Access denied');
    }

    next();
  };
}

module.exports = requireLogin;