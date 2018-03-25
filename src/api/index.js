import 'whatwg-fetch';
import 'es6-promise';
import {filterToUrlParams} from './utils';
import mappings from './mappings';

const API_ROOT = 'http://api.mlsn.ru/v1';


export default {
  fetchLists(regionId) {
    const params = [
      `building{cityId:${regionId}}`,
      'material',
      `realty{cityId:${regionId}}`,
      'saleSearchPeriod',
      'rentSearchPeriod',
      'furniture',
      'rubrics',
      'BuisnesSaleRubrics',
      'BuisnesRentRubrics',
      'rentTypes',
      'dailyRentTypes'
    ].join(',');

    const url = API_ROOT + '/lists/group?lists=' + params;

    return fetch(url)
      .then(response => response.json())
      .then(json => mappings.lists(json.data));
  },

  fetchDistricts(localityId) {
    const url = API_ROOT + `/lists/okatoDistricts?localityId=${localityId}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => json.data);
  },

  fetchPoints(type, filter) {
    const params = filterToUrlParams(filter);
    const url = API_ROOT + `/${type}?${params}`;

    return fetch(url)
      .then(response => response.json())
      .then(json => json.data);
  }
};

