import { useSearch } from '@/api/movie.hooks';
import Image from 'next/image';
import Seo from '@/components/Seo';
import Error from '@/components/Error';
import { Button } from '@/components/Button';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 2em;
  padding-top: 11rem;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 2em;
  background-image: linear-gradient(
      to bottom,
      #020414 5%,
      transparent 50%,
      rgb(2 4 20 / 60%) 70%,
      rgb(2 4 20 / 95%) 90%,
      #020414 100%
    );

  @media(min-width: 768px) {
    padding-left: 2em;
    padding-right: 2em;
  }
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const MovieItem = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  background-color: #ff002e80;
  overflow: hidden;
`;

const MovieContent = styled.div`
  width: 100%;
  padding: 1em;
  font-size: 14px;
  overflow: hidden;

  @media(min-width: 768px) {
    font-size: 16px;
  }
`;

const MovieTitle = styled.p`
  font-size: 1.25em;;
`;

const MovieOverview = styled.p`
  display: -webkit-box;
  margin-top: 1rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1em;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

export default function Search({ query }) {

  const { status, data, error, isFetchingNextPage, hasNextPage, fetchNextPage } = useSearch(query);

  return (
    <Wrapper>
      <Seo title="Search" />
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'error' ? (
        <Error error={error?.message} />
      ) : (
        <>
          <MovieList>
            {data.pages
              .flatMap(page => page.data.results)
              .map(movie => (
                <MovieItem key={movie.id}>
                  <Image
                    src={
                      movie.poster_path
                        ? `${process.env.IMAGES_URL}/original${movie.poster_path}`
                        : '/images/poster.jpg'
                    }
                    alt={movie.title}
                    width="180"
                    height="260"
                  />
                  <MovieContent>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieOverview>{movie.overview}</MovieOverview>
                  </MovieContent>
                </MovieItem>
              ))}
          </MovieList>
          {hasNextPage &&
            <ButtonWrapper>
              <Button onClick={() => fetchNextPage()}>
                {!isFetchingNextPage ? 'Load more' : 'Loading more results'}
              </Button>     
            </ButtonWrapper>
          }
        </>
      )}
    </Wrapper>
  );
}

export async function getServerSideProps({ query: { query } }) {
  return {
    props: {
      query
    }
  };
}
