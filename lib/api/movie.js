import { axiosGet, axiosPost } from './axios';

const NOW_PLAYING = '/movie/now_playing';
const TOP_RATED = '/movie/top_rated';
const POPULAR = '/movie/popular';
const UPCOMING = '/movie/upcoming';

export async function getMovie(movieId) {
  const { data } = await axiosGet(`/movie/${movieId}`);
  return data;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getMovies = (endpoint, params = null) => {
  return async ({ pageParam = 1 }) => {
    const { data } = await axiosGet(endpoint, {
      page: pageParam,
      ...params
    });

    return {
      data,
      nextCursor: pageParam !== data.total_pages ? pageParam + 1 : null
    };
  };
};

export async function getRandomMovie() {
  const endpoints = [NOW_PLAYING, TOP_RATED, POPULAR, UPCOMING];
  const { data } = await axiosGet(endpoints[getRandomInt(0, 3)], {
    page: getRandomInt(1, 10)
  });

  const movieId = data.results[getRandomInt(0, 19)].id;
  return await getMovie(movieId);
}

export const getCast = async movieId => {
  const { data } = await axiosGet(`/movie/${movieId}/credits`);
  return data;
};

export const getRecommendations = async movieId => {
  const { data } = await axiosGet(`/movie/${movieId}/recommendations`);
  return data;
};

export const getFavoriteMovies = (accountId, session_id) => {
  return async ({ pageParam = 1 }) => {
    const { data } = await axiosGet(`/account/${accountId}/favorite/movies`, {
      page: pageParam,
      session_id
    });

    return {
      data,
      nextCursor: pageParam !== data.total_pages ? pageParam + 1 : null
    };
  };
};

export const getTrailer = async movieId => {
  const { data } = await axiosGet(`/movie/${movieId}/videos`);
  const trailer = data.results.find(({ type }) => type === 'Trailer');
  return trailer;
};

export const markAsFavorite = async (accountId, session_id, movieId, favorite) => {
  const { data } = await axiosPost(
    `/account/${accountId}/favorite`,
    {
      media_type: 'movie',
      media_id: movieId,
      favorite
    },
    { session_id }
  );

  return data;
};
