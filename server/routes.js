const jwt = require('jwt-simple');
const express = require('express');
const Router = express.Router;
const router = new Router();

const ACCOUNT = {
  username: 'test',
  password: 123456,
  name: 'Nguyen Minh Thang',
};

const SECRET = 'abcd1234';

router.route('/').get((req, res) => {
  res.json({
    message: 'Welcome to API!'
  });
});
router.route('/login').post((req, res) => {
  const {
    username,
    password
  } = req.body;
  let response = {
    data: {
      error: 'Login fail'
    },
    status: false
  };
  if (username == ACCOUNT.username && password == ACCOUNT.password) {
    const name = ACCOUNT.name;
    const token = jwt.encode({
      username,
      name
    }, SECRET);
    response = {
      data: {
        username,
        name,
        token
      },
      status: true
    }
  }
  res.json(response);
});

router.route('/me').get((req, res) => {
  if(req.account){
    res.json({
      data: req.account
    });
  }else{
    res.status(401);
    res.json({
      data: {
        error: 'Not Authorized'
      }
    })
  }
});

module.exports = router;