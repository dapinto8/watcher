import { withRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { createSession } from '@/lib/api/auth';

function Session({ router }) {

  const { request_token, approved } = router.query;

  const [cookies, setCookie] = useCookies(['session_id']);

  if (approved) {
    createSession(request_token).then(({ session_id }) => {
      setCookie('session_id', session_id, {
        path: '/',
        secure: !(process.env.NODE_ENV === 'development')
      });
    });
  }

  return <div></div>;
}

export default withRouter(Session);
