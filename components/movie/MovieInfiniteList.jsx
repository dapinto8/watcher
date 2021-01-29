import styled from 'styled-components';
import MovieItem from './MovieItem';
import { SectionTitle } from '@/components/Text';
import LoaderList from '@/components/LoaderList';
import LoaderItem from '@/components/LoaderItem';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation]);

const Wrapper = styled.section`
  padding: 0.5em 0;
`;

export default function MovieInfiniteList({ title, fetcher }) {
  const { status, data, error, isFetchingNextPage, fetchNextPage } = fetcher();

  const onReachEnd = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
        onReachEnd={onReachEnd}
      >
        {data.pages
          .flatMap((page) => page.data.results)
          .map((movie) => (
            <SwiperSlide key={movie.id} className="movie">
              <MovieItem movie={movie} />
            </SwiperSlide>
          ))}
        {isFetchingNextPage && [...Array(5).keys()].map((num) => (
          <SwiperSlide key={num} className="movie">
            <LoaderItem />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}
