import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import HomePage from "../../components/home/HomePage";
import EventDashboard from "../../components/events/EventDashboard/EventDashboard";
import EventDetailedPage from "../../components/events/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../components/user/PeopleDashboard/PeopleDashboard";
import UserDetailedPage from "../../components/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../components/user/Settings/SettingsDashboard";
import EventForm from "../../components/events/EventForm/EventForm";
import NavBar from "../../components/nav/NavBar/NavBar";
import TestComponent from "../../components/testarea/TestComponent";
import ModalManager from "../../components/modals/ModalManager";

class App extends Component {
  render() {
    return (
      <>
        <ModalManager />
        <Route exact path='/' component={HomePage} />
        <Route
          exact
          path='/(.+)'
          render={() => (
            <>
              <NavBar />
              <Container className='main'>
                <Switch key={this.props.location.key}>
                  <Route exact path='/events' component={EventDashboard} />
                  <Route path='/events/:id' component={EventDetailedPage} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/people/:id' component={UserDetailedPage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route
                    path={["/createEvent", "/manage/:id"]}
                    component={EventForm}
                  />
                  <Route path='/test' component={TestComponent} />
                </Switch>
              </Container>
            </>
          )}
        />
      </>
    );
  }
}

export default withRouter(App);
