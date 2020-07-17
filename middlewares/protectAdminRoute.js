  
module.exports = function protectAdminRoute(req, res, next) {
  if (req.session.currentUser && req.session.currentUser.admin) next();
  else res.redirect("/");
};