import React, { Component, PropTypes } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {
  
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h3>To do List</h3>

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              class='task-input'
              type="text"
              ref="textInput"
              placeholder="Add tasks"
            />
          </form>
        </header>

        <ul class='task'>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

// App.propTypes = {
// tasks: PropTypes.array.isRequired,
// };

export default withTracker(() => {
  console.log(Tasks.find({}).fetch())
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);