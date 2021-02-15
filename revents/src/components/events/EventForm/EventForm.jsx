/* global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { getLatLong, geocodeByAddress } from "react-places-autocomplete";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import cuid from "cuid";

import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "Please provide a category" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")
});

class EventForm extends Component {
  state = { cityLatLng: {}, venueLatLng: {} };

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;

    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        photoURL: "/assets/user.png",
        hostedBy: "Bob"
      };

      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLong(results[0]))
      .then(latlng => {
        this.setState({ cityLatLng: latlng });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLong(results[0]))
      .then(latlng => {
        this.setState({ venueLatLng: latlng });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                type='text'
                component={TextInput}
                placeholder='Give your event a name'
              ></Field>
              <Field
                name='category'
                type='text'
                component={SelectInput}
                options={category}
                placeholder='What is your event about'
              ></Field>
              <Field
                name='description'
                type='text'
                rows={3}
                component={TextArea}
                placeholder='Tell us about your event'
              ></Field>
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                onSelect={this.handleCitySelect}
                placeholder='Event city'
              ></Field>
              <Field
                name='venue'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ["establishment"]
                }}
                placeholder='Event venue'
              ></Field>
              <Field
                name='date'
                dateFormat='dd LLL yyyy h:mm a'
                component={DateInput}
                showTimeSelect
                timeFormat='HH:mm'
                placeholder='Event date'
              ></Field>

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type='submit'
              >
                Submit
              </Button>
              <Button
                type='button'
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapPropsToState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return { initialValues: event };
};

export default connect(mapPropsToState, { createEvent, updateEvent })(
  reduxForm({ form: "eventForm", validate })(EventForm)
);
