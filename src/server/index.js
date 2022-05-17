const Sequelize = require('sequelize');
let dbName = 'electron-test';
let db = new Sequelize(`postgres://localhost/${dbName}`, {
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
    if (db.config.database === 'electron-test') {
      await db.sync({ force: true });
      const lisa = await User.create({ firstName: 'Lisa', lastName: 'Knox' });
      const kitty = await User.create({
        firstName: 'Jean-Michel',
        lastName: 'Cat',
      });
      const kiera = await User.create({
        firstName: 'Kiera',
        lastName: 'Chien',
      });
      await Todo.create({ text: 'buy cat food', userId: lisa.id });
      await Todo.create({ text: 'eat cat food', userId: kitty.id });

      console.log('~~~db seeded!~~~');
      app.listen(42069, () => console.log(`listening on port hadrcoded 42069`));
    }
  } catch (error) {
    console.log(error);
  }
};

//experiment zone-------------------------------------------
/*
apply a new db
make one loadData() that cycles through every model and does a findaAll()
and sends everything up front wtf
*/
app.get('/database/:databaseName', async (req, res, next) => {
  try {
    await db.close();
    db = null;
    db = await new Sequelize(`postgres://localhost/${req.params.databaseName}`);
    // await db.authenticate();
    console.log('~~~~new db authenticated:', db);
    res.send(db.config.database);
  } catch (error) {
    next(error);
  }
});

console.log('DATABASE>>', db.config.database);

//--------------------------------------------------------

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
    // console.log(db);
    res.send(Object.keys(db.models));
  } catch (error) {
    next(error);
  }
});

module.exports = { db, init, User, app };
