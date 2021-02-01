import { useEffect } from 'react';
import { useFavorites } from '@/api/movie.hooks';
import { useCookies } from 'react-cookie';
import { useFavoritesContext } from '@/context/favoritesContext';
import MovieList from './MovieList';

export default function FavoriteMovies() {
  const [cookies] = useCookies(['session_id', 'user']);
  const { setFavorites } = useFavoritesContext();
  const props = useFavorites(cookies.user?.id, cookies.session_id);

  let movies = [];
  if (props?.data) {
    movies = props.data.pages.flatMap(page => page.data.results);
  }

  useEffect(() => {
    if (props?.data) {
      const favorites = props.data.pages.flatMap(page => page.data.results).map(({ id }) => id);
      setFavorites(favorites);
    }
  }, [props])

  return (
    <MovieList
      title="Your favorite movies"
      movies={movies}
      {...props}
    />
  );
}
