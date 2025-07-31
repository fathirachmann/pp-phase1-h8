const express = require('express');
const app = express()
const port = 3000
const router = require('./routes/router');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(router)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

// Skeleton Code, add anything as needed