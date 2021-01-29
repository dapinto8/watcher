import { axiosInstance } from '@/lib/api/index';

import { useInfiniteQuery, useQuery } from 'react-query';


const apiKey = process.env.API_KEY;
const NOW_PLAYING = '/movie/now_playing';
const TOP_RATED = '/movie/top_rated';
const POPULAR = '/movie/popular';
const UPCOMING = '/movie/upcoming';

export const getMovies = (endpoint) => {
  return async ({ pageParam = 1 }) => {
    const { data } = await axiosInstance.get(
      `${endpoint}?api_key=${apiKey}&page=${pageParam}`
    );

    return {
      data,
      nextCursor: pageParam !== data.total_pages ? pageParam + 1 : null
    };
  };
};

const getNextPageParam = (lastPage) => lastPage.nextCursor;

export function useNowPlaying() {
  return useInfiniteQuery('nowPlayingMovies', getMovies(NOW_PLAYING), {
    getNextPageParam
  });
}

export function useTopRated() {
  return useInfiniteQuery('topRatedMovies', getMovies(TOP_RATED), {
    getNextPageParam
  });
}

export function usePopular() {
  return useInfiniteQuery('popularMovies', getMovies(POPULAR), {
    getNextPageParam
  });
}

export function useUpcoming() {
  return useInfiniteQuery('upcomingMovies', getMovies(UPCOMING), {
    getNextPageParam
  });
}

export async function getMovie(movieId) {
  const { data } = await axiosInstance.get(
    `/movie/${movieId}?api_key=${apiKey}`
  );

  return data;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export async function getRandomMovie() {
  const endpoints = [NOW_PLAYING, TOP_RATED, POPULAR, UPCOMING];
  const { data: { results } } = await axiosInstance.get(
    `${endpoints[getRandomInt(0, 3)]}?api_key=${apiKey}`
  );

  const movieId = results[getRandomInt(0, 19)].id;
  return await getMovie(movieId);
}

export const getCast = async (movieId) => {
  const { data } = await axiosInstance.get(
    `/movie/${movieId}/credits?api_key=${apiKey}`
  );

  return data;
};

export function useCast(movieId) {
  return useQuery(['movieCast', movieId], () => getCast(movieId));
}

export const getRecommendations = async (movieId) => {
  const { data } = await axiosInstance.get(
    `/movie/${movieId}/recommendations?api_key=${apiKey}`
  );

  return data;
};

export function useRecommendations(movieId) {
  return useQuery(['movieRecommendations', movieId], () => getRecommendations(movieId));
}

export const getTrailer = async (movieId) => {
  const { data: { results } } = await axiosInstance.get(
    `/movie/${movieId}/videos?api_key=${apiKey}`
  );

  const trailer = results.find(({ type }) => type === 'Trailer');
  
  return trailer;
};

export function useTrailer(movieId) {
  return useQuery(['movieTrailer', movieId], () => getTrailer(movieId));
}

export const markAsFavorite = async (movieId, sessionId) => {
  const { data } = await axiosInstance.post(
    `/account/${movieId}/favorite?api_key=${apiKey}&session_id=${sessionId}`
  );

  return data;
};
