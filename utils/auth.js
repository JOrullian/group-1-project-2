const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    console.log('need to login')
  } else {
    next();
  }
};

module.exports = withAuth;
