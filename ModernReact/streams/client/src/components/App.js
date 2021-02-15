import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Always use react-router-dom instead of react-router
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit" exact component={StreamEdit} />
            <Route path="/streams/delete" exact component={StreamDelete} />
            <Route path="/streams/show" exact component={StreamShow} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
