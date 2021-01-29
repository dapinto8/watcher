import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { markAsFavorite } from '@/lib/api/movie';
import styled from 'styled-components';

const HeartButton = styled.button`
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/66955/web_heart_animation.png');
  background-repeat: no-repeat;
  background-size: 2900%;
  background-position: left;
  background-color: transparent;
  height: 50px;
  width: 50px;
  cursor: pointer;
`;

export default function Favorite({ movieId, deafultFavorite = false }) {
  const [cookies, setCookie] = useCookies(['session_id']);
  const [favorite, setFavorite] = useState(deafultFavorite);

  const mark = async () => {
    const res = await markAsFavorite(movieId, cookies.session_id);
    console.log(res)
  }
  return (
    <HeartButton
      className={favorite ? 'animate-heart' : ''}
    />
  );
}
