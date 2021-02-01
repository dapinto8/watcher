import { axiosGet, axiosPost } from './axios';

export const createRequestToken = async () => {
  const { data } = await axiosGet('/authentication/token/new');
  return data;
};

export const createSession = async (request_token) => {
  const { data } = await axiosPost('/authentication/session/new', { request_token });
  return data;
}

export const getAccount = async (session_id) => {
  const { data } = await axiosGet('/account', { session_id });
  return data;
};

