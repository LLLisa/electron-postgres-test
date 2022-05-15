import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Grid from './Grid';

class Root extends React.Component {
  render() {
    console.log('component');
    return <Grid />;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
