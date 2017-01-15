import _ from 'lodash/fp';
import {List} from 'immutable';
import {createAction} from 'redux-actions';

import {getStackedChartDatasets} from '../api';

const extractDataSets = (buckets, countries, years) => {
  const getCountrySumsForYear = year => {
    const bucketForYear = _.find({key_as_string: year})(buckets);
    return _.map(country => {
      if (!bucketForYear) {
        return [country, 0];
      }
      const value = _.flow([
        _.get('country_buckets.buckets'),
        _.find({key: country}),
        _.get('sum_by_country.value')
      ])(bucketForYear);
      return [country, value || 0];
    })(countries);
  };

  const sumByYearByCountry = _.flow([
    _.map(getCountrySumsForYear),
    _.map(_.fromPairs),
    _.zip(years),
    _.fromPairs,
  ])(years);

  const sumsByCountry = _.map(country => {
    const data = _.flow([
      _.mapValues(country),
      _.values,
    ])(sumByYearByCountry);
    return {label: country, data};
  })(countries);

  return sumsByCountry;
};

export default createAction(
  'LOAD_STACKED_CHART_DATA',
  ({years, countries}) => {
    return getStackedChartDatasets({countries})
      .then(({aggregations: {histogram: {buckets}}}) => {
        const datasets = extractDataSets(buckets, countries.toJS(), years.toJS());
        return List(datasets);
      });
  }
);
