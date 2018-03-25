import keys from 'lodash/object/keys';
import isArray from 'lodash/lang/isArray';


export default {
  filterToUrlParams(data) {
    return keys(data)
      .filter(key =>
        isArray(data[key]) && data[key].length || !isArray(data[key])
      )
      .map(key => {
        if (isArray(data[key])) {
          let result = [];
          data[key].forEach((value) => {
            result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(value));
          });

          return result.join('&');
        } else {
          return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }
      }).join('&');
  },
}