import Link from 'next/link';
import styled from 'styled-components';
import Favorite from './Favorite';

const MovieWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const Movie = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const MovieImage = styled.img``;

const MovieTitle = styled.span`
  display: block;
  margin-top: 0.5em;
  text-align: center;
  font-size: 14px;
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
`;

export default function MovieItem({ movie }) {
  return (
    <Link href={`/movie/${encodeURIComponent(movie.id)}`}>
      <MovieWrapper>
        <FavoriteWrapper>
          <Favorite movieId={movie.id} />
        </FavoriteWrapper>
        <Movie>
          <MovieImage
            src={`${process.env.IMAGES_URL}/w500${movie.poster_path}`}
            alt={movie.name}
          />
        </Movie>
        <MovieTitle>{movie.title}</MovieTitle>
      </MovieWrapper>
    </Link>
  );
}
