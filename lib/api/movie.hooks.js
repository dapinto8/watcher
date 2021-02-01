import { useInfiniteQuery, useQuery } from 'react-query';
import { getMovies, getCast, getTrailer, getRecommendations, getFavoriteMovies } from './movie';

const SEARCH = '/search/movie';
const NOW_PLAYING = '/movie/now_playing';
const TOP_RATED = '/movie/top_rated';
const POPULAR = '/movie/popular';
const UPCOMING = '/movie/upcoming';

const getNextPageParam = lastPage => lastPage.nextCursor;

export function useSearch(query) {
  return useInfiniteQuery('searchMovies', getMovies(SEARCH, { query }), {
    getNextPageParam
  })
}

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

export function useFavorites(accountId, sessionId) {
  if (!accountId && !sessionId) return null;
  return useInfiniteQuery('favoriteMovies', getFavoriteMovies(accountId, sessionId), {
    getNextPageParam
  });
}

export function useCast(movieId) {
  return useQuery(['movieCast', movieId], () => getCast(movieId));
}

export function useRecommendations(movieId) {
  return useQuery(['movieRecommendations', movieId], () =>
    getRecommendations(movieId)
  );
}

export function useTrailer(movieId) {
  return useQuery(['movieTrailer', movieId], () => getTrailer(movieId));
}