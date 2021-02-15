import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = () => <Icon name='marker' size='big' color='red'></Icon>;

const EventDetailedMap = ({ lat, lng }) => {
  const zoom = 14;

  return (
    <Segment attached='bottom' style={{ padding: "0px" }}>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys='AIzaSyB_wJvx2fuzURJRtJ7UXxyzR3vFPir1QI8'
          defaultCenter={{ lat, lng }}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
