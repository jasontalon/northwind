import * as _ from 'lodash';

export default async ({ app }, inject) => {
  inject('_', _);
};
