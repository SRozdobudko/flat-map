import omit from 'lodash/object/omit';
import keys from 'lodash/object/keys';
import {
  LOAD_INIT_DATA,
  UPDATE_FILTER,
  SET_FILTER,
} from '../actions';

export * from './map';


export function dictionary(state = {loaded: false, data: {}}, action) {
  switch (action.type) {
    case LOAD_INIT_DATA:
      return {
        loaded: true,
        data: action.lists
      };
    default:
      return state;
  }
}

export function filter(state = {}, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      const key = keys(action.field)[0];

      return action.field[key]
        ? {...state, ...action.field}
        : omit(state, key);
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}


export function defaultDistricts() {
  return [
    {
      id: 52401372,
      name: 'Ленинский',
      shortName: 'лен'
    },
    {
      id: 52401364,
      name: 'Кировский',
      shortName: 'кир'
    },
    {
      id: 52401376,
      name: 'Октябрьский',
      shortName: 'окт'
    },
    {
      id: 52401380,
      name: 'Советский',
      shortName: 'сов'
    },
    {
      id: 52401382,
      name: 'Центральный',
      shortName: 'цен'
    }
  ];
}

