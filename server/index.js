const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');


const ENV = process.env.NODE_ENV; //gives info about if I am working in dev/production, use this to make some changes in backend.
const PORT = process.env.PORT || 3000; //which port the express server will be running on. If not use 5000 port number. 

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/cities', require('./api/cities'));
app.use('/api/weather', require('./api/weather'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });

db.query('SELECT NOW()', (err, res) => {
    if (err.error)
      return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`);
  });

module.exports = app;