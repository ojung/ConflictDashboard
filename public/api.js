import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info',
});

export function getResorts() {
  return client.search({
    index: 'bundestag',
    body: {
      size: 0,
      query: {
        match_all: {}
      },
      aggs: {
        resorts: {
          terms: {
            field: 'resort.keyword',
            size: 500
          }
        }
      }
    }
  });
}

export function getTypes() {
  return client.search({
    index: 'bundestag',
    body: {
      size: 0,
      query: {
        match_all: {}
      },
      aggs: {
        types: {
          terms: {
            field: 'type.keyword',
            size: 500
          }
        }
      }
    }
  });
}

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
      query: {
        match: {
          country: {
            query: input
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
        type: {
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

export function getRadarChartDatasets({countries}) {
  return client.search({
    index: 'bundestag',
    body: {
      size: 0,
      query: {
        bool: {
          should: getShoulds(countries)
        }
      },
      aggs: {
        countries: {
          terms: {
            field: 'country.keyword',
            size: 500
          },
          aggs: {
            resorts: {
              terms: {
                field: 'resort.keyword',
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

function getShoulds(countries) {
  return countries
    .map(({name}) => ({match: {'country.keyword': name}}))
    .toJS();
}
