import _ from 'lodash';
import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

export function ping() {
  return client.ping();
}

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
    .then(({aggregations: {distinct_countries: {buckets}}}) => {
      return buckets;
    });
}
