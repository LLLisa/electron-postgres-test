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

const Todo = db.define('todo', {
  text: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Todo.belongsTo(User);
User.hasMany(Todo);

const init = async () => {
  try {
    await db.sync({ force: true });
    const lisa = await User.create({ firstName: 'Lisa', lastName: 'Knox' });
    const kitty = await User.create({
      firstName: 'Jean-Michel',
      lastName: 'Cat',
    });
    const kiera = await User.create({ firstName: 'Kiera', lastName: 'Chien' });
    await Todo.create({ text: 'buy cat food', userId: lisa.id });
    await Todo.create({ text: 'eat cat food', userId: kitty.id });

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

app.get('/todos', async (req, res, next) => {
  try {
    const response = await Todo.findAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

app.get('/models', (req, res, next) => {
  try {
    res.send(Object.keys(db.models));
  } catch (error) {
    next(error);
  }
});

app.get('/generic/:model', async (rec, res, next) => {});

module.exports = { db, init, User, app };
