import Seo from '@/components/Seo';
import styled from 'styled-components';
import { getRandomMovie, useNowPlaying, useTopRated, usePopular, useUpcoming } from '@/lib/api/movie';
import MovieInfiniteList from '@/components/movie/MovieInfiniteList';
import MovieHero from '@/components/movie/MovieHero';

const ListsWrapper = styled.section`
  margin-top: 2em;
`;

export default function Home({ movie }) {
  return (
    <div>
      <Seo title="Home" />
      <MovieHero movie={movie} />
      <ListsWrapper>
        <MovieInfiniteList title="New movies" fetcher={useNowPlaying} />
        <MovieInfiniteList title="Top rated" fetcher={useTopRated} />
        <MovieInfiniteList title="Popular" fetcher={usePopular} />
        <MovieInfiniteList title="Upcoming" fetcher={useUpcoming} />
      </ListsWrapper>
    </div>
  );
}

export async function getServerSideProps() {
  const movie = await getRandomMovie();
  return { props: { movie } };
}
