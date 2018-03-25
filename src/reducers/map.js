import {
  SET_MAP_CENTER,
  SET_MAP_ZOOM,
  SET_BOUNDS,
  LOAD_POINTS
} from '../actions';


const defaultState = {
  center: [54.98, 73.38],
  zoom: 12,
  bounds: null,
  polygon: null,
  drawing: false,
  points: {
    loaded: false,
    data: []
  }
};

export function map(state = defaultState, action) {
  switch (action.type) {
    case SET_MAP_ZOOM:
      return {...state, zoom: action.zoom};
    case SET_MAP_CENTER:
      return {...state, center: action.center};
    case LOAD_POINTS:
      return {
        ...state,
        points: {
          loaded: true,
          data: action.points
        }
      };
    case SET_BOUNDS:
      return {...state, bounds: action.bounds};
    default:
      return state;
  }
}