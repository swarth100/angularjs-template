require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('./server/modules/socket-io/socket-io');

/* Routing */
const apiRoute = require('./server/routes/api');

/* Defines the application */
let app = express();

/* Parsers for POST data */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* Point static path to dist */
app.use(express.static(path.join(__dirname, '/app')));

/* Set our api routes */
app.use('/api', apiRoute);

/* Catch all other routes and return the index file */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

/* Get port from environment and store in Express. */
const port = process.env.PORT || '3000';
app.set('port', port);

/* Sets the server to port 3000.
 * Opens port 3000 to listen for connections
 * Otherwise use heroku provided port */
app.set('port', (process.env.PORT || 3000));
let server = app.listen(app.get('port'), () => {
    console.log('[Server] : open on port ' + app.get('port'));
});

socket.start(server);
