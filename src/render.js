// const Sequelize = require('sequelize');
// const db = new Sequelize('postgres://localhost/electron-test', {
//   logging: false,
// });

// console.log('test');

// const User = db.define('user', {
//   firstName: {
//     type: Sequelize.STRING,
//   },
//   lastName: {
//     type: Sequelize.STRING,
//   },
// });

// const init = async () => {
//   try {
//     await db.sync({ force: true });
//     const lisa = await User.create({ firstName: 'Lisa', lastName: 'Knox' });
//     const kitty = await User.create({
//       firstName: 'Jean-Michel',
//       lastName: 'Cat',
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// init();

// import React from 'react';
// import * as ReactDom from 'react-dom/client';

// class Main extends React.Component {
//   render() {
//     console.log('component');
//     return <hr />;
//   }
// }

// const container = document.getElementById('root');
// console.log(container);
// const root = ReactDom.createRoot(container);
// root.render(<Main />);
