exports.geterror = (req, res, next) => {
    res.status(404).render('404', {
     Title: 'Page Not Found',
      path: '/404',
      isAuthenticated: req.session.isLoggedIn
    });
  };
  