import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
// import { useQueryClient } from 'react-query';
import { useUser } from '@/context/userContext';
import { markAsFavorite } from '@/api/movie';
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

export default function Favorite({ movieId, defaultFavorite }) {
  // const queryClient = useQueryClient();
  const { user } = useUser();
  const [cookies] = useCookies(['session_id']);
  const [favorite, setFavorite] = useState(defaultFavorite);

  useEffect(() => {
    setFavorite(defaultFavorite);
  }, [defaultFavorite]);

  const mark = async () => {
    setFavorite(!favorite);
    const res = await markAsFavorite(user.id, cookies.session_id, movieId, !favorite);
    // queryClient.refetchQueries(['favoriteMovies']);
  };

  return user ? (
    <HeartButton
      data-testid="favorite"
      onClick={() => mark()}
      className={favorite ? 'animate-heart' : ''}
    />
  ) : (
    <></>
  );
}
