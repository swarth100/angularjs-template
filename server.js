require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
// const socket = require('./app/models/socket-io/socket-io');

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

/* Create HTTP server */
const server = http.createServer(app);

/* Listen on provided port, on all network interfaces. */
server.listen(port, () => {
  console.log(`API running on localhost:${port}`)
});
