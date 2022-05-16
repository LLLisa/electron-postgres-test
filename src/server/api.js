// const express = require('express');
// const app = express();
// const { User } = require('../server');
// const path = require('path');

// app.use('/dist', express.static(path.join(__dirname, '../../dist')));
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });

// app.get('/users', async (req, res, next) => {
//   try {
//     console.log(User);
//     const response = await User.findAll();
//     res.send(response);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = app;
