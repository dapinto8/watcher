import MovieList from './MovieList';
import { useRecommendations } from '@/api/movie.hooks';

export default function MovieRecommendations({ movieId }) {
  const { status, data, error } = useRecommendations(movieId);

  return data?.results.length ? (
    <MovieList
      title={'Recommendations'}
      status={status}
      movies={data ? data.results : []}
      error={error}
    />
  ) : (
    <></>
  );
}
