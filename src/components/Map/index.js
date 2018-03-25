import {Map as LeafletMap, Marker} from 'react-leaflet';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {values, isEqual} from 'lodash';
import OSMTileLayer from './OSMTileLayer';


class Map extends Component {

  shouldComponentUpdate(nextProps) {
    return (!isEqual(nextProps.points, this.props.points));
  }

  renderMarkers(points) {
    return points.map(point =>
      <Marker position={[+point.lat, +point.lon]} key={point.id} />);
  }

  render() {
    return (
      <LeafletMap center={this.props.center}
                  zoom={this.props.zoom}
                  ref="map"
                  maxZoom={18}
                  style={{width: '100%', height: '100%'}}>

        <OSMTileLayer />
        {this.renderMarkers(this.props.points)}

      </LeafletMap>
    );
  }
}

export default connect(state => ({points: values(state.map.points.data)}))(Map);




