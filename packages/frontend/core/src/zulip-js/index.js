import api from './api';
import eventsWrapper from './events-wrapper';
import accounts from './resources/accounts';
import emojis from './resources/emojis';
import events from './resources/events';
import filters from './resources/filters';
import messages from './resources/messages';
import queues from './resources/queues';
import reactions from './resources/reactions';
import server from './resources/server';
import streams from './resources/streams';
import typing from './resources/typing';
import users from './resources/users';

function getCallEndpoint(config) {
  return function callEndpoint(endpoint, method = 'GET', params) {
    const myConfig = { ...config };
    let finalendpoint = endpoint;
    if (!endpoint.startsWith('/')) {
      finalendpoint = `/${endpoint}`;
    }
    const url = myConfig.apiURL + finalendpoint;
    return api(url, myConfig, method, params);
  };
}

function resources(config) {
  return {
    config,
    callEndpoint: getCallEndpoint(config),
    accounts: accounts(config),
    streams: streams(config),
    messages: messages(config),
    queues: queues(config),
    events: events(config),
    users: users(config),
    emojis: emojis(config),
    typing: typing(config),
    reactions: reactions(config),
    server: server(config),
    filters: filters(config),
    callOnEachEvent: eventsWrapper(config),
  };
}

async function zulipInit(initialConfig) {
  // fixed config
  initialConfig = {
    username: 'giangth@vietis.com.vn',
    apiKey: 'dhTiGhXcoS4KdFnS70DOb6nV107GFAOs',
    realm: 'http://10.1.7.109:9991',
  };

  const config = initialConfig;
  if (config.realm.endsWith('/api')) {
    config.apiURL = `${config.realm}/v1`;
  } else {
    config.apiURL = `${config.realm}/api/v1`;
  }

  if (!config.apiKey) {
    const res = await accounts(config).retrieve();
    config.apiKey = res.api_key;
  }
  return resources(config);
}

export default zulipInit;
