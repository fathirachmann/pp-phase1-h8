const express = require('express');
const session = require('express-session');
const Controller = require('../controllers/indexController');
const productRouter = require('../routes/route-products');

const router = express.Router()


router.use('/product', productRouter);


router.get('/', Controller.home)
router.get('/signup', Controller.signup)
router.post('/signup', Controller.validate)

// middleware is used to control what will be next stage
const mwOne = ((req, res, next) => {
  console.log('Time:', Date.now(), "<<Mw One")
  next()
})


router.get('/login', mwOne, Controller.login)
router.post('/login', Controller.postLogin)

// the next function is the one used as middleware

// Global MW assumed after user success login
// this session works fine only want to test for next route 
// router.use((req, res, next) => {
// 	console.log(req.session); // received from postLogin Controller 
// 	if (!req.session.userId) {
// 		const err = "Please login first"
// 		res.redirect(`/login?err=${err}`)
// 		console.log('Time:', Date.now(), "<<Mw One")
// 	} else { 
//   next()}
// })

// to test to another route

router.use((req, res, next) => {
  console.log(req.session); // check the session object
  if (!req.session.userId) {
    const err = "Please login first";
    console.log('Time:', Date.now(), "<<Mw One");
    return res.redirect(`/login?err=${err}`);
  }

  //  redirect based on role
  if (req.originalUrl === '/' && req.session.role === 'admin') {
    return res.redirect('/product'); // or wherever admin should go
  }

  if (req.originalUrl === '/' && req.session.role === 'user') {
    return res.redirect('/product');
  }

  next(); // move on to product routes, that is the expectation.
});

router.get('/logout', Controller.logout)


module.exports = router