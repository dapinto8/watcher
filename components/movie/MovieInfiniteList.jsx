import MovieList from './MovieList';

export default function MovieInfiniteList({ title, fetcher }) {

  const props = fetcher();

  let movies = [];
  if (props.data) {
    movies = props.data.pages.flatMap(page => page.data.results);
  }

  return (
    <MovieList
      title={title}
      movies={movies}
      {...props}
    />
  );
}
