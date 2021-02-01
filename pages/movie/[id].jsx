import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { getMovie } from '@/api/movie';
import { useTrailer } from '@/api/movie.hooks';
import styled from 'styled-components';
import MovieHero from '@/components/movie/MovieHero';
import CastList from '@/components/cast/CastList';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import MovieOverview from '@/components/movie/MovieOverview';

const Wrapper = styled.section`
  padding-top: 1rem;
  padding-bottom: 2em;
`;

export default function Movie({ movie }) {
  // const { status, data: trailer, error } = useTrailer(movie.id);
  // console.log(trailer);

  const router = useRouter();
  
  const getGenres = () => {
    let genres = movie.genres.slice(0, 3);
    return genres.map(g => g.name).join(', ');
  };

  let image = movie.backdrop_path || movie.poster_path;
  image = image ? `${process.env.IMAGES_URL}/original${image}` : 'null';

  return (
    <div>
      <Seo
        title={movie.title}
        description={movie.overview}
        image={image}
        keywords={`Movie, ${movie.title}, ${getGenres()}`}
        path={router.pathname}
      />
      <MovieHero movie={movie} />
      <Wrapper>
        <MovieOverview movie={movie} />
        {/*<a href={`https://www.themoviedb.org/video/play?key=${status === 'success' ? trailer.key : ''}`}>Trailer</a>*/}
        <CastList movieId={movie.id} />
        <MovieRecommendations movieId={movie.id} />
      </Wrapper>
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const movie = await getMovie(id);

  if (!movie) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return { props: { movie } };
}
