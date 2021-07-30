const authMiddleware = (req, res, next) => {
  const { userLogged } = req.session

  if(userLogged || req.path == '/login' || req.path == '/logout') {
    return next()
  }

  return res.redirect('/login')
}

module.exports = authMiddleware