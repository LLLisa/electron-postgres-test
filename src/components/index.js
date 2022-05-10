import React from 'react';
import { createRoot } from 'react-dom/client';

class Root extends React.Component {
  render() {
    console.log('component');
    return <div>hello from the other side</div>;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<Root />);
