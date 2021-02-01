import styled from 'styled-components';
import MovieItem from './MovieItem';
import { SectionTitle } from '../Text';
import LoaderList from '../LoaderList';
import LoaderItem from '../LoaderItem';
import Error from '../Error';
import { useFavoritesContext } from '@/context/favoritesContext';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation]);

const Wrapper = styled.section`
  padding: 0.5rem 0;
`;

export default function MovieList({
  title,
  status,
  movies,
  error,
  hasNextPage = null,
  isFetchingNextPage = null,
  fetchNextPage = null
}) {

  const { favorites } = useFavoritesContext();

  const onReachEnd = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  movies = movies.map(movie => {
    movie.favorite = favorites.includes(movie.id);
    return movie;
  });
  
  return status === 'loading' ? (
    <LoaderList title={title} />
  ) : status === 'error' ? (
    <Error error={error?.message} />
  ) : movies.length > 0 && (
    <Wrapper>
      <SectionTitle>{title}</SectionTitle>
      <Swiper
        navigation
        spaceBetween={16}
        slidesPerView={'auto'}
        freeMode={true}
        onReachEnd={onReachEnd}
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.id} className="movie">
            <MovieItem movie={movie} />
          </SwiperSlide>
        ))}
        {isFetchingNextPage &&
          [...Array(5).keys()].map(num => (
            <SwiperSlide key={num} className="movie">
              <LoaderItem />
            </SwiperSlide>
          ))}
      </Swiper>
    </Wrapper>
  );
}
