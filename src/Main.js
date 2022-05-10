import React from 'react';
import { createRoot } from 'react-dom/client';

class Main extends React.Component {
  render() {
    console.log('component');
    return <hr />;
  }
}

const container = document.getElementById('root');
// console.log(container);
const root = createRoot(container);
root.render(<Main />);
