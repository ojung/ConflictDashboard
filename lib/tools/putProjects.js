const assert = require('assert');

const _ = require('lodash');
const NodeGeocoder = require('node-geocoder');
const Promise = require('bluebird');
const accounting = require('accounting');
const elastic = require('elasticsearch');

const json = require('../../resources/conflictprevention_replaced8.json');

const ACTION = {index: {_index: 'conflictprevention', _type: 'projects'}};

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyB0tf8554G1N9fq97fE1Zi8dWgXSb9vDHU',
  //apiKey: 'AIzaSyC_f8y5H1-8jKDdztM4i3II0ZqG3ItvlKY',
  formatter: null,
};
const geocoder = NodeGeocoder(options);

const client = new elastic.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const content = _(json)
  .map('data')
  .flatten()
  .map(extractColumns)
  .value();

const cache = new Map();
const countries = _(content)
  .map('country')
  .uniq()
  .drop(1)
  .dropRight(1)
  .value();

const actions = _.times(content.length, _.constant(ACTION));

Promise.map(countries, fetchCoords)
  .then(() => {
    return _(content)
      .map((obj) => {
        const {country} = obj;
        if (!cache.has(country)) {
          return null;
        }
        const {latitude, longitude} = cache.get(country);
        return _.assign(obj, {location: {lat: latitude, lon: longitude}});
      })
      .compact()
      .value();
  })
  .then(locatedContent => {
    client.bulk({
      body: _.flatten(_.zip(actions, content)),
    });
  })
  .catch(err => console.error(err));

// Google maps API key: AIzaSyB0tf8554G1N9fq97fE1Zi8dWgXSb9vDHU
function fetchCoords(country) {
  return geocoder.geocode(country)
    .then(data => {
      assert(data.length === 1);
      cache.set(country, data[0]);
      return data;
    });
}

function extractColumns([
  ignored,
  {text: year},
  {text: resort},
  {text: land},
  {text: title},
  {text: amount},
  {text: budgetTitle},
  {text: type}
]) {
  const idx = amount.indexOf(',');
  const euro = amount.substr(0, idx).replace(/\./g, ',');
  const cent = amount.substr(idx + 1, amount.length);
  const parsedAmount = accounting.parse(euro + '.' + cent);
  return {
    year,
    resort,
    country: land,
    title,
    amount: parsedAmount,
    budgetTitle,
    type
  };
}
