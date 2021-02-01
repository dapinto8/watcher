import { useUser } from '@/context/userContext';
import { createRequestToken } from '@/api/auth';
import Link from 'next/link';
import Search from '@/components/Search';
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
  padding: 1rem 1.5rem;
  font-size: 1rem;

  @media(min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.25rem;
  }
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 0.5rem;
`;

const LogoText = styled.span`
  vertical-align: middle;
  color: white;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const NavLink = styled.a`
  display: inline-block;
  color: white;
  text-transform: uppercase;
  transition: color 0.3s ease-out;
  cursor: pointer;

  &:hover {
    color: #ff002e;
  }
`;

function HeaderComponent() {
  const { user } = useUser();

  const login = () => {
    createRequestToken().then(({ request_token }) => {
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${process.env.SITE_URL}/session`;
    });
  };

  return (
    <Header>
      <Link href="/">
        <a>
          <Logo src="/icons/watcher.svg" alt="Watcher Logo" />
          <LogoText>Watcher</LogoText>
        </a>
      </Link>
      <Flex>
        <Search />
        {user ? (
          <p>Hi, {user.username}</p>
        ) : (
          <>
            <NavLink onClick={() => login()}>Login</NavLink>
            <NavLink
              href="https://www.themoviedb.org/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign up
            </NavLink>
          </>
        )}
      </Flex>
    </Header>
  );
}

export default HeaderComponent;
