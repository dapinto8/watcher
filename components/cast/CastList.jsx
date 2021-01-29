import CastItem from './CastItem';
import { useCast } from '@/lib/api/movie';
import styled from 'styled-components';
import { SectionTitle } from '@/components/Text';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation]);

const Wrapper = styled.section`
  padding: 0.5em 0;
`;

export default function CastList({ movieId }) {

  const { status, data, error } = useCast(movieId);

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <Wrapper>
      <SectionTitle>Cast</SectionTitle>
      <Swiper
        navigation
        spaceBetween={16}
        slidesPerView={'auto'}
        freeMode={true}
      >
        {data.cast.slice(0, 20).map((person) => (
          <SwiperSlide key={person.id} className="cast">
            <CastItem person={person} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}
