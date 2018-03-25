import 'normalize.css';
import cn from './App.css';

import {loadInitData, loadPoints} from '../actions';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import isEqual from 'lodash/lang/isEqual';
import Filter from './Filter';
import Map from './Map';


class App extends Component {

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(loadInitData())
      .then((filter) => dispatch(loadPoints(filter)));
  }

  componentDidUpdate(prevProps) {
    const isFilterUpdated = !isEqual(prevProps.filter, this.props.filter);

    if (isFilterUpdated) {
      const {filter, dispatch, rubric} = this.props;
      dispatch(loadPoints(rubric, filter));
    }
  }

  render() {
    return (
      <div className={cn.root}>
        {this.props.dictionary.loaded && <Filter />}

        <div className={cn.map}>
          <Map center={this.props.map.center}
               zoom={this.props.map.zoom} />
        </div>
      </div>
    );
  }
}


export default connect(state=>state)(App);
