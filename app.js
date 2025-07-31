const express = require('express');
const app = express()
const port = 4000
const router = require('./routes/router');
const session = require('express-session');

app.use(session({
  secret: 'hacktiv8',
  resave: false, //if there is change then save otherwise no
  saveUninitialized: false, //to implement login session
  cookie: { 
    secure: false, //for https (since devt)
    sameSite: true // to protect from csrf attack
} 
}))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))



app.use(express.static('public'));
app.use(router)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

// Skeleton Code, add anything as needed