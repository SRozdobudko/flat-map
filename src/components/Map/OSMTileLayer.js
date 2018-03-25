import React from 'react';
import {TileLayer} from 'react-leaflet';


const OSMTileLayer = (props) =>
  <TileLayer
    url='http://a.tile.osm.org/{z}/{x}/{y}.png'
    subdomains="abc"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    {...props}
  />;

export default OSMTileLayer;
