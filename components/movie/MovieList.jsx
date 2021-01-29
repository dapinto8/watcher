import styled from 'styled-components';
import MovieItem from './MovieItem';
import { SectionTitle } from '@/components/Text';
import LoaderList from '@/components/LoaderList';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation]);

const Wrapper = styled.section`
  padding: 0.5em 0;
`;


export default function MovieList({ title, status, movies, error }) {
  return status === 'loading' ? (
    <LoaderList title={title} />
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <Wrapper>
      <SectionTitle>{title}</SectionTitle>
      <Swiper
        navigation
        spaceBetween={16}
        slidesPerView={'auto'}
        freeMode={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="movie">
            <MovieItem movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}
