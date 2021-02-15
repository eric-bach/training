import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <Icon name='marker' size='big' color='red'>
    {text}
  </Icon>
);

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 11
  };

  render() {
    const { latlng } = this.props;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys='AIzaSyB_wJvx2fuzURJRtJ7UXxyzR3vFPir1QI8'
          defaultCenter={latlng}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={latlng.lat} lng={latlng.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
