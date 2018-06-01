require('dotenv')
  .config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const routes = require('./routes');
const jwt = require('jwt-simple');

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

const domain1 = 'http://localhost:3000';
const domain2 = 'http://localhost:4000';

const URL = process.env.SITE_URL || domain1;
const PORT = process.env.PORT || '8000';
const SECRET = 'abcd1234';

const whitelist = [URL, domain2];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    };
  } else {
    corsOptions = {
      origin: false
    };
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate), (req, res, next) => {
  // authenticate middleware
  const token = req.headers['authorization'];

  if (token && token !== 'null') {
    const decodeToken = jwt.decode(token, SECRET);
    if (decodeToken.username) {
      req.account = {...decodeToken, token};
      next();
      return;
    }
    res.status(401);
    res.json({
      data: {
        error: 'Not Authorized'
      }
    })
  }
  next();
});

app.use('/', routes);

server.listen(PORT, () => {
  console.log('Server login multi domain');
});

module.exports = app;