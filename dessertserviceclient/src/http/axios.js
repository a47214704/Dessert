import axios from 'axios';

axios.defaults.withCredentials = false;
// 發送前的動作
axios.interceptors.request.use((config) => config, (error) => {
  const value = error;
  return Promise.reject(value);
});

// 接收響應前的動作
axios.interceptors.response.use((response) => response, (error) => {
  const value = error.response;
  return Promise.resolve(value);
});

const urlPath = "http://localhost:5210";
let CancelToken = null;
let source = null;

const setAuthorization = (data) => {
  let headers = data;
  const token = localStorage.getItem('jwtToken');
  if (token !== '' || token !== null) {
    headers = Object.assign(headers, {
      Authorization: token,
    });
  }
  return headers;
};

export default {
  post(url, value) {
    const params = {
      method: 'POST',
      baseURL: urlPath,
      url,
      data: value,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    params.headers = setAuthorization(params.headers);
    return axios(params).then((response) => response).catch((response) => response);
  },
  put(url, value) {
    const params = {
      method: 'PUT',
      baseURL: urlPath,
      url,
      data: value,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    params.headers = setAuthorization(params.headers);
    return axios(params).then((response) => response).catch((response) => response);
  },
  get(url) {
    const params = {
      method: 'GET',
      baseURL: urlPath,
      url,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    params.headers = setAuthorization(params.headers);
    return axios(params).then((response) => response).catch((response) => response);
  },
  delete(url, val) {
    const params = {
      method: 'DELETE',
      baseURL: urlPath,
      url,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: val,
    };
    params.headers = setAuthorization(params.headers);
    return axios(params).then((response) => response).catch((response) => response);
  },
  head(url) {
    const params = {
      method: 'HEAD',
      baseURL: urlPath,
      url,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    params.headers = setAuthorization(params.headers);
    return axios(params).then((response) => response).catch((response) => response);
  },
  uploadFile(url, value) {
    CancelToken = axios.CancelToken;
    source = CancelToken.source();
    const params = {
      method: 'POST',
      baseURL: urlPath,
      url,
      data: value,
      timeout: 30000,
      headers: {
        Accept: "multipart/signed",
      },
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      dataType: "json",
      cancelToken: source.token,
    };
    params.headers = setAuthorization(params.headers);
    return axios(params).then((response) => response).catch((response) => response);
  },
  cancel() {
    source.cancel();
  },
};
