const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

//initialize the app
const app = express();
app.use(express.json());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());

//json middleware
app.use(bodyParser.urlencoded({
    extended: true
}));


//use the passport middleware
app.use(passport.initialize());

//bring in passport strategy
require('./middleware/passport');

//connection to a database
const db = require("./models");
//db.sequelize.sync({ alter: true }).then(() => {
  //console.log("drop and re-sync the database if it contains existing tables");
//})

//bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users)

//bring in the faculte route
const facultes = require('./routes/api/facultes');
app.use('/api/facultes', facultes)

//bring in the filiere route
const filieres = require('./routes/api/filieres');
app.use('/api/filieres', filieres)

//bring in the specialites route
const specialites = require('./routes/api/specialites');
app.use('/api/specialites', specialites)

//bring in the niveau route
const niveaux = require('./routes/api/niveaux');
app.use('/api/niveaux', niveaux)

//bring in the documents route
const documents = require('./routes/api/documents');
app.use('/api/documents', documents)

//bring in the domaines route
const ues = require('./routes/api/ues');
app.use('/api/ues', ues)

//bring in the domaines route
const domaines = require('./routes/api/domaines');
app.use('/api/domaines', domaines)

//start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server started on port '+ port));

/*
app.use(function (req, res, next) {
  res.setHeader(
    'Report-To',
    '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"http://localhost:5000/__cspreport__"}],"include_subdomains":true}'
  );
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://images.unsplash.com; script-src 'self' https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/ 'sha256-INJfZVfoUd61ITRFLf63g+S/NJAfswGDl15oK0iXgYM='; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css; frame-src 'self' https://www.youtube.com https://youtube.com; report-to csp-endpoint; report-uri /__cspreport__;"
  );
  next();
});
app.use(
  bodyParser.json({
    type: [
      'application/json',
      'application/csp-report',
      'application/reports+json',
    ],
  })
);

app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/bg.jpg'));
});

app.post('/__cspreport__', (req, res) => {
  console.log(req.body);
});

*/