import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const axiosGet = (endpoint, params) => {
  return axiosInstance.get(endpoint, {
    params: {
      api_key: process.env.API_KEY,
      ...params
    }
  }).catch(error => {
    console.error(error)
    return error;
  });
};

export const axiosPost = (endpoint, data, params) => {
  return axiosInstance.post(endpoint, data, {
    params: {
      api_key: process.env.API_KEY,
      ...params
    }
  }).catch(error => {
    console.error(error)
    return error;
  });
};
