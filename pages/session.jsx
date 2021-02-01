import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { createSession, createRequestToken } from '@/api/auth';
import Seo from '@/components/Seo';
import { Button } from '@/components/Button';
import styled from 'styled-components';

const Wrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 2rem;
  padding: 10rem 2rem 1rem 2rem;
  font-size: 1.5rem;
  background-image: linear-gradient(
      to bottom,
      #020414 5%,
      transparent 50%,
      rgb(2 4 20 / 60%) 70%,
      rgb(2 4 20 / 95%) 90%,
      #020414 100%
    ),
    url('/images/background.jpg');

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export default function Session({ requestToken, approved }) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['session_id']);

  if (approved && !cookies.session_id) {
    createSession(requestToken).then(({ session_id }) => {
      setCookie('session_id', session_id, {
        path: '/',
        secure: !(process.env.NODE_ENV === 'development')
      });
    });
  }

  const login = () => {
    createRequestToken().then(({ request_token }) => {
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${process.env.SITE_URL}/session`;
    });
  };

  return (
    <Wrapper>
      <Seo title="Session" />
      {approved ? (
        <div>
          <p>Very good, you're already logged in</p>
          <p>Now you can add movies to your favorites list</p>
          <Button onClick={() => router.push('/')}>Go to home</Button>
        </div>
      ) : (
        <div>
          <p>You didn't approve the login</p>
          <Button onClick={() => login()}>Try again</Button>
        </div>
      )}
    </Wrapper>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      requestToken: query.request_token,
      approved: query.approved
    }
  };
}
