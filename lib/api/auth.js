import { axiosInstance } from '@/lib/api/index';

export const createRequestToken = async () => {
  const { data } = await axiosInstance.get(
    `/authentication/token/new?api_key=${process.env.API_KEY}`
  );
  return data;
};

export const createSession = async (request_token) => {
  const { data } = await axiosInstance.post(
    `/authentication/session/new?api_key=${process.env.API_KEY}`,
    { request_token }
  );
  return data;
}

export const createGuestSession = async () => {
  const { data } = await axiosInstance.get(
    `/authentication/guest_session/new?api_key=${process.env.API_KEY}`
  );
  return data;
};
