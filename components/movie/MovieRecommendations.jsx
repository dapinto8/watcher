import MovieList from '@/components/movie/MovieList';
import { useRecommendations } from '@/lib/api/movie';

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
