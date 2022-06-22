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
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("drop and re-sync the database if it contains existing tables");
// })

//bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users)

//bring in the raison route
const raisons = require('./routes/api/raisons');
app.use('/api/raisons', raisons)

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

//bring in the ues route
const ues = require('./routes/api/ues');
app.use('/api/ues', ues)

//bring in the types route
const types = require('./routes/api/types');
app.use('/api/types', types)

//bring in the domaines route
const domaines = require('./routes/api/domaines');
app.use('/api/domaines', domaines)

//bring in the signalements route
const signalements = require('./routes/api/signalements');
app.use('/api/signalements', signalements)

//bring in the notifications route
const notifications = require('./routes/api/notifications');
app.use('/api/notifications', notifications)
/**
 * route for chat fonctionnalities
 */

//bring in the requete route
const requetes = require('./routes/api/chat/requetes');
app.use('/api/chat/requetes', requetes)

//start server
const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log('server started on port '+ port));
require("./socket")(server);

// const socketio = require("socket.io")(server);

// global.io = socketio;
// global.io.on('connection',  require("./WebSockets").connection)


// const server = app.listen(port, () => console.log('server started on port '+ port));