import _ from 'lodash/fp';
import {createAction} from 'redux-actions';

import {getStackedChartData} from '../api';

const YEARS = [
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
];

const extractDataSets = (buckets, countries) => {
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
    _.zip(YEARS),
    _.fromPairs,
  ])(YEARS);

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
  filters => {
    return getStackedChartData(filters)
      .then(({aggregations: {histogram: {buckets}}}) => {
        const datasets = extractDataSets(buckets, filters.countries.toJS());
        return {labels: YEARS, datasets};
      });
  }
);
