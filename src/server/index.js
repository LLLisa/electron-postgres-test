const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/electron-test', {
  logging: false,
});
const path = require('path');
const express = require('express');
const app = express();

// const app = require('./api');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

const init = async () => {
  try {
    await db.sync({ force: true });
    const lisa = await User.create({ firstName: 'Lisa', lastName: 'Knox' });
    const kitty = await User.create({
      firstName: 'Jean-Michel',
      lastName: 'Cat',
    });
    const kiera = await User.create({ firstName: 'Kiera', lastName: 'Chien' });
    console.log('~~~db seeded!~~~');
    app.listen(42069, () => console.log(`listening on port hadrcoded 42069`));
  } catch (error) {
    console.log(error);
  }
};

app.use('/dist', express.static(path.join(__dirname, '../../dist')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/users', async (req, res, next) => {
  try {
    const response = await User.findAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

app.post('/users', async (req, res, next) => {
  try {
    const response = await User.create(req.body.user);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = { db, init, User, app };
