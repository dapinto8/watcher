import Link from 'next/link';
import Favorite from './Favorite';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5em;
`;

const SmallLightText = styled.p`
  padding: 0 0.5em;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 300;
  color: white;
`;

const SmallLightBackText = styled(SmallLightText)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  margin: 0 auto;
  padding: 0.25em 0.5em;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.alt};
`;

const MovieBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 60vh;
  background-image: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.secondary} 5%,
      transparent 50%,
      ${({ theme }) => theme.colors.secondary} 90%
    ),
    url(${({ image }) => image});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
  cursor: pointer;
`;

const MovieInfo = styled.div``;

const MovieTitleWrapper = styled.div`
  position: relative;
  width: 600px;
  margin: 0 auto;
`;

const MovieTitle = styled.h1`
  padding: 0.25em 0.5em;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.75rem;
  line-height: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  transition: all .2s ease-out;

  &:hover {
    color: white;
  }
`;

const MovieRatingStar = styled.img`
  width: 12px;
  margin-right: 2px;
`;

const FavoriteWrapper = styled.div`
  position: absolute;
  left: calc(100% - 12px);
  top: -2px;
`;

export default function MovieHero({ movie }) {
  // console.log(movie);

  return (
    <section>
      <MovieBackground
        image={`${process.env.IMAGES_URL}/original${
          movie.backdrop_path || movie.poster_path
        }`}
      >
        <MovieInfo>
          {movie.production_companies.length > 0 && (
            <SmallLightText>
              {movie.production_companies[0].name}
            </SmallLightText>
          )}
          <MovieTitleWrapper>
            <MovieTitle>
              <Link href={`/movie/${encodeURIComponent(movie.id)}`}>
                <a>{movie.title}</a>
              </Link>
            </MovieTitle>
            <FavoriteWrapper>
              <Favorite movieId={movie.id} />
            </FavoriteWrapper>
          </MovieTitleWrapper>
          <FlexContainer>
            {movie.genres.map((genre) => (
              <SmallLightText key={genre.id}>{genre.name}</SmallLightText>
            ))}
          </FlexContainer>
          <SmallLightBackText>
            <MovieRatingStar src="/icons/star.svg" alt="Star" />
            <span>{movie.vote_average}</span>
          </SmallLightBackText>
        </MovieInfo>
      </MovieBackground>
    </section>
  );
}
