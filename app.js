const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cors = require('cors');


//initialize the app
const app = express();

app.use(bodyParser.json());
/*
const headerConfigCors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin' , "*");
  res.header('Access-Control-Allow-Credentials' , true);
  res.header('Access-Control-Allows-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requestde-With, Content-Type, Accept');
  next(); 
}
app.use(headerConfigCors);
*/

app.use(cors());
//json middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

//configuration the static directory
app.use(express.static(path.join(__dirname, 'public')));

//use the passport middleware
app.use(passport.initialize());

//bring in passport strategy
require('./middleware/passport');

//connection to a database
const db = require("./models");
db.sequelize.sync({ alter: true }).then(() => {
  console.log("drop and re-sync the database if it contains existing tables");
})

//bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users)

//bring in the admin route
const admins = require('./routes/api/admins');
app.use('/api/admins', admins)

//bring in the faculte route
const facultes = require('./routes/api/facultes');
app.use('/api/facultes', facultes)

//bring in the filiere route
const filieres = require('./routes/api/filieres');
app.use('/api/filieres', filieres)

//bring in the niveau route
const niveaux = require('./routes/api/niveaux');
app.use('/api/niveaux', niveaux)

//start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server started on port '+ port));
