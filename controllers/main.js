const loginView = (req, res) => {
  if(req.session.userLogged) {
    return res.redirect('/')
  }
  return res.render('login')
}

const loginPost = (req, res) => {
  req.session.userLogged = req.body.username
  res.cookie('userLogged', req.body.username)
  return res.redirect('/login')
}

const logout = (req, res) => {
  req.session.destroy()
  res.cookie('userLogged', '')
  return res.redirect('/login')
}

module.exports = {
  loginView,
  loginPost,
  logout
}