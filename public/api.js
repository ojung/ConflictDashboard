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
  });
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
  });
}

