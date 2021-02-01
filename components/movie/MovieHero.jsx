import Link from 'next/link';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SmallLightText = styled.p`
  padding: 0 0.5rem;
  text-align: center;
  font-size: 0.75em;
  font-weight: 300;
  color: white;
`;

const SmallLightBackText = styled(SmallLightText)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  margin: 0 auto;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: rgb(255 0 46 / 20%);
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
      #020414 5%,
      transparent 50%,
      rgb(2 4 20 / 60%) 70%,
      rgb(2 4 20 / 95%) 90%,
      #020414 100%
    ),
    url(${({ image }) => image});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
  cursor: pointer;
`;

const MovieInfo = styled.div`
  @media(min-width: 768px) {
    font-size: 20px
  }

  @media(min-width: 1024px) {
    font-size: 24px
  }
`;

const MovieTitleWrapper = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const MovieTitle = styled.h1`
  padding: 0.25em 0.5em;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.75em;
  line-height: 1em;
  font-weight: 700;
  color: #FF002E;
  transition: all 0.2s ease-out;

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

  let image = movie.backdrop_path || movie.poster_path;
  image = image ? `${process.env.IMAGES_URL}/original${image}` : '/images/background.jpg';

  return (
    <section>
      <MovieBackground image={image}>
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
          </MovieTitleWrapper>
          <FlexContainer>
            {movie.genres.map(genre => (
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
