// const loginView = (req, res) => {
//   if(req.session.userLogged) {
//     return res.redirect('/')
//   }
//   return res.render('login')
// }

// const loginPost = (req, res) => {
//   req.session.userLogged = req.body.username
//   res.cookie('userLogged', req.body.username)
//   return res.redirect('/login')
// }

// const logout = (req, res) => {
//   req.session.destroy()
//   res.cookie('userLogged', '')
//   return res.redirect('/login')
// }

// module.exports = {
//   loginView,
//   loginPost,
//   logout
// }

// LOGIN
const GETlogin = (req, res) => {
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }
  return res.render('login')
}

const POSTlogin = (req, res) => {
  res.cookie('userLogged', req.body.username)
  return res.redirect('/login')
}

// SIGNUP
const GETsignup = (req, res) => {
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }
  return res.render('signup')
}

const POSTsignup = (req, res) => {
  res.cookie('userLogged', req.body.username)
  return res.redirect('/signup')
}

// FAIL 
const GETfail = (req, res) => {
  return res.render('auth-error')
}

//LOGOUT
const GETlogout = (req, res) => {
  req.logout()
  return res.redirect('/')
}

module.exports = {
  GETlogin,
  POSTlogin,
  GETsignup,
  POSTsignup,
  GETfail,
  GETlogout
}