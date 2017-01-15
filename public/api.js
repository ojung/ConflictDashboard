import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info',
});

export function getYears() {
  return client.search({
    index: 'bundestag',
    body: {
      size: 0,
      query: {
        match_all: {}
      },
      aggs: {
        years: {
          terms: {
            field: 'year',
            size: 500
          }
        }
      }
    }
  });
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
  });
}

export function getStackedChartDatasets({countries}) {
  return client.search({
    index: 'bundestag',
    body: {
      size: 0,
      query: {
        bool: {
          should: getShoulds(countries),
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

export function getDoughnutChartData({countries}) {
  return client.search({
    index: 'bundestag',
    body: {
      size: 0,
      query: {
        bool: {
          should: getShoulds(countries),
        }
      },
      aggs: {
        resort: {
          terms: {
            field: 'type.keyword',
            size: 500
          },
          aggs: {
            sum: {
              sum: {
                field: 'amount'
              }
            }
          }
        }
      }
    }
  });
}

function getShoulds(countries) {
  return countries
    .map(country => ({match: {'country.keyword': country}}))
    .toJS();
}
