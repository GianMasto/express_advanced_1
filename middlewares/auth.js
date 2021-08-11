// const authMiddleware = (req, res, next) => {
//   const { userLogged } = req.session

//   if(userLogged || req.path == '/login' || req.path == '/logout') {
//     return next()
//   }

//   return res.redirect('/login')
// }


const authMiddleware = (req, res, next) => {
  if(req.isAuthenticated() || req.path == '/login' || req.path == '/logout' || req.path == '/signup' || req.path == '/fail' || req.path == '/auth/facebook' || req.path == '/auth/facebook/callback') {
    return next()
  }

  return res.redirect('/login')
}

module.exports = authMiddleware