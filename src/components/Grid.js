import React from 'react';
import connect from 'react-redux';

class Grid extends React.Component {
  render() {
    return <hr />;
  }
}

export default connect((state) => state)(Grid);
