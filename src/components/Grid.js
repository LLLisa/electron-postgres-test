import React from 'react';
import { connect } from 'react-redux';
import {
  loadUsers,
  loadTodos,
  loadModels,
  addUser,
  genericLoader,
} from '../store';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTable: '',
      firstName: '',
      lastName: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.tableSubmit = this.tableSubmit.bind(this);
  }

  async componentDidMount() {
    console.log('CDM', this.props);
    // this.props.loadUsers();
    this.props.genericLoader('users');
    this.props.loadTodos();
    await this.props.loadModels();
    this.setState({ selectedTable: this.props.models[0] });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.models.length && this.props.models.length) {
    }
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
    this.setState({ selectedTable: ev.target.value });
  }

  render() {
    console.log('render', this.props, this.state);
    const { selectedTable } = this.state;
    const { models } = this.props;
    return (
      <div>
        {/* {selectedTable.length && Object.hasOwn(this.props, [selectedTable]) ? (
          <table>
            <thead>
              <tr>
                {Object.keys(this.props[selectedTable][0]).map((field, i) => {
                  return <th key={i}>{field}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {this.props[selectedTable].map((row, i) => {
                return (
                  <tr key={i}>
                    {Object.values(row).map((field, i) => {
                      return <td key={i}>{field}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>table not found</p>
        )} */}
        <select
          name="tableSelect"
          value={selectedTable}
          onChange={this.tableSubmit}
        >
          {models.length
            ? models.map((model, i) => {
                return <option key={i}>{model}</option>;
              })
            : ''}
        </select>
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
    loadTodos: () => dispatch(loadTodos()),
    loadModels: () => dispatch(loadModels()),
    addUser: (user) => dispatch(addUser(user)),
    genericLoader: (slice) => dispatch(genericLoader(slice)),
  };
};

export default connect((state) => state, mapDispatch)(Grid);
