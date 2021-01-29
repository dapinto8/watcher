import Seo from '@/components/Seo';
import { withRouter } from 'next/router';
import { getMovie, useTrailer } from '@/lib/api/movie';
import styled from 'styled-components';
import { SectionTitle } from '@/components/Text';
import MovieHero from '@/components/movie/MovieHero';
import CastList from '@/components/cast/CastList';
import MovieRecommendations from '@/components/movie/MovieRecommendations';

const Wrapper = styled.section`
  margin-top: 1rem;
`;

const Container = styled.div`
  max-width: 760px;
  padding: 0 1.5em;
  margin-bottom: 1em;

  @media(min-width: 1024px) {
    padding: 0 2em;
  }
`;

const MovieDescription = styled.p`
  font-size: 1rem;
`;

const TextBlock = styled.p`
  font-weight: 300;

  a {
    text-decoration: underline;
  }

  span, a {
    &:first-child {
      font-weight: 500;
      letter-spacing: 0.5px;
    }
  }
`;

function Movie({ movie, router }) {

  const { status, data: trailer, error } = useTrailer(movie.id);
  console.log(trailer);

  const getStringList = (list, key) => {
    return list.map((item, i) => (
      <span key={i}>{item[key]}{i < list.length-1 ? ', ' : ''}</span>
    ))
  }

  const toAmount = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  let metaImage = movie.backdrop_path || movie.poster_path;
  metaImage = metaImage ? `${process.env.IMAGES_URL}/original${metaImage}` : null;

  return (
    <div>
      <Seo
        title={movie.title}
        description={movie.overview}
        image={metaImage}
        keywords={`Movie, ${movie.title}`}
        path={router.pathname}
      />
      <MovieHero movie={movie} />
      <Wrapper>
        <section>
          <SectionTitle>Overview</SectionTitle>
          <Container>
            <MovieDescription>{movie.overview}</MovieDescription>
          </Container>
        </section>
        <section>
          <SectionTitle>Deatils</SectionTitle>
          <Container>
            <TextBlock>
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                Official site
              </a>
            </TextBlock>
            <TextBlock>
              <span>Release date: </span>
              {movie.release_date}
            </TextBlock>
            <TextBlock>
              <span>Original title: </span>
              {movie.original_title}
            </TextBlock>
            <TextBlock>
              <span>Budget: </span>
              {toAmount(movie.budget)}
            </TextBlock>
            <TextBlock>
              <span>Revenue: </span>
              {toAmount(movie.revenue)}
            </TextBlock>
            <TextBlock>
              <span>Production Co: </span>
              {getStringList(movie.production_companies, 'name')}
            </TextBlock>
            <TextBlock>
              <span>Country: </span>
              {getStringList(movie.production_countries, 'iso_3166_1')}
            </TextBlock>
            <TextBlock>
              <span>Language: </span>
              {getStringList(movie.spoken_languages, 'english_name')}
            </TextBlock>
          </Container>
        </section>
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

export default withRouter(Movie);
