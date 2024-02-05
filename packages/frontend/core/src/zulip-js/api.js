import axios from 'axios';

async function api(baseUrl, config, method, params) {
  const url = new URL(baseUrl);
  const auth = `${config.username}:${config.apiKey}`;
  const authHeader = `Basic ${auth}`;
  const options = {
    method,
    headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json;charset=UTF-8',
      // "Access-Control-Allow-Origin":"*",
      Authorization: authHeader,
    },
  };
  if (method === 'POST') {
    options.data = new FormData();
    Object.keys(params).forEach(key => {
      let data = params[key];
      if (Array.isArray(data)) {
        data = JSON.stringify(data);
      }
      options.data.append(key, data);
    });
  } else if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const response = await axios(url.href, options);
  try {
    return response.data;
  } catch (e) {
    if (e instanceof SyntaxError) {
      // We probably got a non-JSON response from the server.
      // We should inform the user of the same.
      let message = 'Server Returned a non-JSON response.';
      if (response.status === 404) {
        message += ` Maybe endpoint: ${method} ${response.url.replace(
          config.apiURL,
          ''
        )} doesn't exist.`;
      } else {
        message += ' Please check the API documentation.';
      }
      const error = new Error(message);
      error.res = response;
      throw error;
    }
    throw e;
  }
}

export default api;
