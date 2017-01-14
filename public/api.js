import _ from 'lodash/fp';
import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info',
});

export function getCountrySuggestion(input) {
  return client.search({
    index: 'bundestag',
    body: {
      size: 0,
      _source: ['country'],
      query: {
        match: {
          country: {
            query: input,
            operator: 'and'
          }
        }
      },
      aggs: {
        distinct_countries: {
          terms: {
            field: 'country.keyword'
          }
        }
      }
    }
  })
    .then(({aggregations: {distinct_countries: {buckets}}}) => buckets);
}

export function getStackedChartData({countries}) {
  const shoulds = countries.map(country => ({match: {'country.keyword': country}}));
  return client.search({
    index: 'bundestag',
    body: {
      size: 0,
      query: {
        bool: {
          should: shoulds.toJS(),
        }
      },
      aggs: {
        histogram: {
          date_histogram: {
            field: 'year',
            interval: 'year'
          },
          aggs: {
            country_buckets: {
              terms: {
                field: 'country.keyword',
                size: 500
              },
              aggs: {
                sum_by_country: {
                  sum: {
                    field: 'amount'
                  }
                }
              }
            }
          }
        }
      }
    }
  })
    .then(({aggregations: {histogram: {buckets}}}) => {
      const years = _.map('key_as_string')(buckets);
      const datasets = extractDataSets(buckets);
      return {labels: years, datasets};
    });
}

const extractDataSets = (buckets) => {
  return _.flow([
    _.map('country_buckets'),
    _.map('buckets'),
    _.flatten,
    _.groupBy('key'),
    _.mapValues(_.flow([
      _.map('sum_by_country'),
      _.map('value'),
    ])),
    _.toPairs,
    _.reduce((result, value) => result.concat(getDataSet(value[0], value[1])), [])
  ])(buckets);
};

const getDataSet = (country, data) => {
  return {
    label: country,
    data,
    fill: true,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointBorderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    spanGaps: false,
  };
};
