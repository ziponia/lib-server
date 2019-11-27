import React from "react";
import GoogleMap, { ClickEventValue } from "google-map-react";
import styled from "styled-components";

const GOOGLE_APP_KEY: any = process.env.REACT_APP_GOOGLE_MAP_KEY;
type Props = {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  onClick?: (e: ClickEventValue) => void;
};

const GoogleMapViewer: React.FC<Props> = props => {
  return (
    <GoogleMapWrapper
      bootstrapURLKeys={{ key: GOOGLE_APP_KEY }}
      zoom={props.zoom}
      center={props.center}
      onClick={props.onClick}
    >
      {props.children}
    </GoogleMapWrapper>
  );
};

const GoogleMapWrapper = styled(GoogleMap)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

GoogleMapWrapper.defaultProps = {
  center: {
    lat: 37.517351,
    lng: 127.0452441
  },
  zoom: 12
};

export default GoogleMapViewer;
