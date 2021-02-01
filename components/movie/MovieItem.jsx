import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from '../Image';
import Favorite from './Favorite';

const MovieWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const Movie = styled.div`
  position: relative;
  width: 100%;
  height: 210px;
  border-radius: 8px;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 300px;
  }

  @media (min-width: 1024px) {
    height: 360px;
  }
`;

const MovieTitle = styled.span`
  display: block;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FavoriteWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
  display: block;
`;

export default function MovieItem({ movie }) {
  const router = useRouter();
  let image = movie.poster_path
    ? `${process.env.IMAGES_URL}/original${movie.poster_path}`
    : '/images/poster.jpg';

  return (
    <MovieWrapper>
      <FavoriteWrapper>
        <Favorite movieId={movie.id} defaultFavorite={movie.favorite} />
      </FavoriteWrapper>
      <Movie
        data-testid="movie"
        role="button"
        onClick={() => router.push(`/movie/${encodeURIComponent(movie.id)}`)}
      >
        <Image src={image} alt={movie.title} />
      </Movie>
      <MovieTitle>{movie.title}</MovieTitle>
    </MovieWrapper>
  );
}
