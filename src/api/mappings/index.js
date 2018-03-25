import values from 'lodash/object/values';
import {toArray} from './utils';


export default {
  lists: lists => {
    return {
      realty: {
        sales: values(lists.realty).map(item =>
          ({
            id: Number(item.id),
            shortName: item.name_short2,
            shortestName: item.name_short,
            name: item.name
          })
        ),
      },
      searchPeriod: {
        rents: toArray(lists.rentSearchPeriod).sort((a, b) => a.id > b.id),
        sales: toArray(lists.saleSearchPeriod).sort((a, b) => a.id > b.id)
      }
    };
  }
};