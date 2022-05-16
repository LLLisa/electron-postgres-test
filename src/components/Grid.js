import React from 'react';
import { connect } from 'react-redux';
import { loadUsers, addUser } from '../store';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      table: '',
      selectedTable: '',
      firstName: '',
      lastName: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.tableSubmit = this.tableSubmit.bind(this);
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
    this.setState({ firstName: '', lastName: '' });
  }

  tableSubmit(ev) {
    ev.preventDefault();
    this.setState({ selectedTable: this.state.table });
    this.setState({ table: '' });
  }

  render() {
    console.log('render', this.props, this.state);
    const { users } = this.props;
    const { selectedTable } = this.state;
    return (
      <div>
        {selectedTable.length && Object.hasOwn(this.props, [selectedTable]) ? (
          <p>hello</p>
        ) : (
          <p>goodbye</p>
        )}
        {/* <div>
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
        </div> */}
        <form>
          <input
            name="table"
            placeholder="table"
            value={this.state.table}
            onChange={this.handleOnChange}
            style={{ margin: '2rem' }}
          ></input>
          <button onClick={this.tableSubmit}>submit</button>
        </form>
        <form>
          <input
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
