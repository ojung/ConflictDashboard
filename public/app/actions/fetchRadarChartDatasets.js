import _ from 'lodash/fp';
import {List} from 'immutable';
import {createAction} from 'redux-actions';

import {getRadarChartDatasets} from '../api';

const extractDataSets = (buckets, countries, resorts) => {
  const getDataForEachCountry = country => {
    const {resorts: {buckets: resortBucketForCountry}} =
      _.find({key: country})(buckets);
    return _.flow([
      _.map(resort => {
        const actualResort = _.find({key: resort})(resortBucketForCountry);
        if (!actualResort) {
          return [resort, 0];
        }
        return [resort, actualResort.sum.value];
      }),
      _.fromPairs,
    ])(resorts);
  };

  const sumByCountryByResort = _.flow([
    _.map(getDataForEachCountry),
    _.zip(countries),
    _.fromPairs,
  ])(countries);

  const sumsByCountry = _.map(country => {
    const data = _.flow([
      _.get(country),
      _.values,
    ])(sumByCountryByResort);
    return {label: country, data};
  })(countries);

  return List(sumsByCountry);
};

export default createAction(
  'LOAD_RADAR_CHART_DATA',
  ({resorts, countries}) => {
    return getRadarChartDatasets({countries})
      .then(({aggregations: {countries: {buckets}}}) => {
        const datasets = extractDataSets(
          buckets,
          countries.map(({name}) => name).toJS(),
          resorts.toJS()
        );
        return List(datasets);
      });
  }
);
