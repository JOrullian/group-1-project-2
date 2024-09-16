const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    console.log('need to login')
  } else {
    next();
  }
};

module.exports = withAuth;