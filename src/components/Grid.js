import React from 'react';
import { connect } from 'react-redux';
import { loadUsers, addUser } from '../store';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    console.log('CDM', this.props);
    this.props.loadUsers();
  }

  handleOnChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  formSubmit(ev) {
    ev.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    this.props.addUser(user);
  }

  render() {
    console.log('render', this.props, this.state);
    const { users } = this.props;
    return (
      <div>
        <div>
          {users.length ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          ) : (
            ''
          )}
        </div>
        <form>
          <input
            autoFocus
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleOnChange}
          ></input>
          <input
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleOnChange}
          ></input>
          <button onClick={this.formSubmit}>submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers()),
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect((state) => state, mapDispatch)(Grid);
