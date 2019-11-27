import React from "react";
import { MdLocationOn } from "react-icons/md";

type Props = {
  lat: number;
  lng: number;
};

const Marker: React.FC<Props> = props => {
  return <MdLocationOn size={40} style={{ marginLeft: -20, marginTop: -40 }} />;
};

export default Marker;
