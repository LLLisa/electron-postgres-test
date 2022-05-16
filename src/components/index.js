import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Grid from './Grid';
import store from '../store';

class Root extends React.Component {
  render() {
    return <Grid />;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);
