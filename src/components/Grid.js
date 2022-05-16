import React from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../store';

class Grid extends React.Component {
  componentDidMount() {
    console.log('CDM', this.props);
    this.props.loadUsers();
  }

  render() {
    return <hr />;
  }
}

const mapDispatch = (dispatch) => {
  return { loadUsers: () => dispatch(loadUsers()) };
};

export default connect((state) => state, mapDispatch)(Grid);
