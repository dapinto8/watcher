import { withRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { createRequestToken } from '@/lib/api/auth';
import Link from 'next/link';
import styled from 'styled-components';

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1em;

  @media (min-width: 1024px) {
    padding: 1em 2em;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 0.5em;
`;

const LogoText = styled.span`
  vertical-align: middle;
  font-size: 20px;
  color: white;
`;

const NavLink = styled.a`
  display: inline-block;
  font-size: 18px;
  color: white;
  text-transform: uppercase;
  transition: color .3s ease-out;
  cursor: pointer;

  &:first-child {
    margin-right: 1em;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary}
  }
`;

function HeaderComponent({ router }) {

  const [cookies, setCookie] = useCookies(['session_id']);

  const login = () => {
    // createRequestToken().then(({ request_token }) => {
    //   window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${process.env.SITE_URL}/session`;
    // });
  }

  return (
    <Header>
      <Link href="/">
        <a>
          <Logo src="/icons/watcher.svg" alt="Watcher Logo" />
          <LogoText>Watcher</LogoText>
        </a>
      </Link>
      <div>
        <NavLink onClick={() => login()}>
          Login
        </NavLink>
        <NavLink href="https://www.themoviedb.org/signup" target="_blank" rel="noopener noreferrer">
          Sign up
        </NavLink>
        {/*{router.pathname === '/' ? (
          <Link href="/">
            <a><Icon src="/icons/home-icon-active.svg" alt="Home" /></a>
          </Link>
        ) : (
          <Link href="/">
            <a><Icon src="/icons/home-icon.svg" alt="Home" /></a>
          </Link>
        )}*/}
      </div>
      
    </Header>
  );
}

export default withRouter(HeaderComponent);
