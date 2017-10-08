const process = require('process');

const Promise = require('bluebird');
const _ = require('lodash/fp');
const elastic = require('elasticsearch');
const getenv = require('getenv');
const minimist = require('minimist');

const client = new elastic.Client({
  host: 'localhost:9200',
  log: getenv.string('LOG_LEVEL', 'error'),
});

const args = minimist(process.argv.slice(2));
const index = args._[0];
const mappings = require(args._[1]);

async function start() {
  await migrate().catch(exitWithError);
}
start();

async function migrate() {
  const aliases = await client.cat.aliases({format: 'json'});
  const relevantAliases = _.filter(['alias',  index])(aliases);

  const latestVersionNumber = _.flow([
    _.map('index'),
    _.map(getVersionNumber),
    _.sortBy(_.identity),
    _.reverse,
    _.first
  ])(relevantAliases) || 0;

  const newVersionNumber = latestVersionNumber + 1;
  const indexName = index + '_v' + newVersionNumber;
  await createVersionedIndex(mappings, indexName);
  await createAlias(indexName);
  await reindex(latestVersionNumber, newVersionNumber);
  await removeOldAliases(relevantAliases);
  exitNormally();
}

async function reindex(latestVersionNumber, newVersionNumber) {
  const oldIndex = index + '_v' + latestVersionNumber;
  const newIndex = index + '_v' + newVersionNumber;
  return client.reindex({body: {
    source: {index: oldIndex},
    dest: {index: newIndex}
  }});
}

async function removeOldAliases(relevantAliases) {
  const promises = _.map(alias => {
    return client.indices.deleteAlias({
      name: alias.alias,
      index: alias.index,
    });
  })(relevantAliases);
  return Promise.all(promises);
}

async function createAlias(indexName) {
  return client.indices.putAlias({
    index: indexName,
    name: index,
  });
}

async function createVersionedIndex(mappings, indexName) {
  return client.indices.create({
    method: 'put',
    index: indexName,
    body: mappings,
  });
}

function getVersionNumber(index) {
  const version = Number(index.split('_v')[1]);
  return !_.isFinite(version) ? -1 : version;
}

function exitNormally() {
  console.log('Migration done.');
  process.exit(0);
}

function exitWithError(error) {
  console.error(error);
  process.exit(1);
}
