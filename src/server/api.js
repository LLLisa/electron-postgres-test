const express = require('express');
const app = express();
const { User } = require('./index');

app.get('/users', async (req, res, next) => {
  try {
    const response = User.findAll();
    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
