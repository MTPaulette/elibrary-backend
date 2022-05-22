const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cors = require('cors');


//initialize the app
const app = express();

//json middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cors());

//configuration the static directory
app.use(express.static(path.join(__dirname, 'public')));

//use the passport middleware
app.use(passport.initialize());

//bring in passport strategy
require('./config/passport');

/*
  //connection to a database
  const db = require("./models");
  db.sequelize.sync({ alter: true }).then(() => {
    console.log("drop and re-sync the database if it contains existing tables");
  })
*/

//bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users)

//start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server started on port '+ port));
