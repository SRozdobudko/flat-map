import Api from '../api';

export const LOAD_INIT_DATA = 'LOAD_INIT_DATA';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const SET_FILTER = 'SET_FILTER';
export const LOAD_POINTS = 'LOAD_POINTS';


export function loadInitData(regionId) {
  return dispatch => {
    return Api.fetchLists(regionId)
      .then(lists => dispatch({type: LOAD_INIT_DATA, lists}));
  };
}

export function updateFilter(field) {
  return {type: UPDATE_FILTER, field};
}


export function loadPoints(rubric) {
  const defaultParams = {
    region_fias: 55
  };

  return (dispatch, getState) => {
    const {filter} = getState();

    Api.fetchPoints('sales', {...defaultParams, ...filter})
      .then(points => dispatch({type: LOAD_POINTS, points}));
  };
}

