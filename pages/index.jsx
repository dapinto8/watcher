import Seo from '@/components/Seo';
import { getRandomMovie } from '@/api/movie';
import { useNowPlaying, useTopRated, usePopular, useUpcoming } from '@/api/movie.hooks';
import MovieHero from '@/components/movie/MovieHero';
import FavoriteMovies from '@/components/movie/FavoriteMovies';
import MovieInfiniteList from '@/components/movie/MovieInfiniteList';
import styled from 'styled-components';

const ListsWrapper = styled.section`
  padding: 1.5em 0;
`;

export default function Home({ movie }) {

  return (
    <div>
      <Seo title="Home" />
      <MovieHero movie={movie} />
      <ListsWrapper>
        <FavoriteMovies />
        <MovieInfiniteList title="Upcoming" fetcher={useUpcoming} />
        <MovieInfiniteList title="New movies" fetcher={useNowPlaying} />
        <MovieInfiniteList title="Popular" fetcher={usePopular} />
        <MovieInfiniteList title="Top rated" fetcher={useTopRated} />
      </ListsWrapper>
    </div>
  );
}

export async function getServerSideProps() {
  const movie = await getRandomMovie();
  return { props: { movie } };
}
