import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import EventList from "../../events/EventList/EventList";
import { createEvent, updateEvent, deleteEvent } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";

class EventDashboard extends Component {
  handleCreateEvent = newEvent => {
    this.props.createEvent(newEvent);
  };

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
  };

  handleDeleteEvent = id => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events, loading } = this.props;

    if (loading) return <LoadingComponent />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Feed</h2>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapPropsToState = state => ({
  events: state.events,
  loading: state.async.loading
});

export default connect(mapPropsToState, {
  createEvent,
  updateEvent,
  deleteEvent
})(EventDashboard);
