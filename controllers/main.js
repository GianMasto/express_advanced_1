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

const { fork } = require('child_process')
const path = require('path')

const GETmain = (req, res) => {
  if(!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  
  const {name, email, picture} = JSON.parse(req.user._raw)

  return res.render('user-info', { name, email, photo: picture.data.url })
}

// LOGIN
const GETlogin = (req, res) => {
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }
  return res.render('login')
}

const POSTlogin = (req, res) => {
  console.log(req.user.displayName)

  res.cookie('userLogged', req.user.displayName)
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
  console.log(req.user.displayName)
  res.cookie('userLogged', req.user.displayName)
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

// INFO
const GETinfo = (req, res) => {
  return res.render('info', {
    args: process.argv,
    os: process.platform,
    version: process.version,
    memoryUsage: process.memoryUsage(),
    execPath: process.execPath,
    pid: process.pid,
    currentPath: process.cwd()
  })
}

// RANDOMS
const GETrandoms = (req, res) => {
  const randomNumbersScript = fork(path.join(__dirname, '../child_process/generateRandomNumbers.js'))

  const numbersAmount = req.query.cant || 100000000

  randomNumbersScript.send(numbersAmount)

  randomNumbersScript.on('message', numbersObject => {
    return res.render('randoms', {numbersObject})
  })
}

module.exports = {
  GETmain,
  GETlogin,
  POSTlogin,
  GETsignup,
  POSTsignup,
  GETfail,
  GETlogout,
  GETinfo,
  GETrandoms
}