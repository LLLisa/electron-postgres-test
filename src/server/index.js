const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/electron-test', {
  logging: false,
});

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
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db, init, models: { User } };
