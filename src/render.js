const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/electron-test');

console.log('test');

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
  } catch (error) {
    console.log(error);
  }
};

init();
