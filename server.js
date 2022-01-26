const express = require("express");
const db = require('./app/config/db')
var session = require('express-session')
// const bodyParser = require("body-parser"); /* deprecated */


const app = express();

var indexRouter = require('./app/routes/index');


// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// configure the app to use bodyParser()

//db connection
db.connect((err)=>{
    err ? console.log(err) : console.log("Db Connected Successfully")
  })

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use('/api', indexRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
