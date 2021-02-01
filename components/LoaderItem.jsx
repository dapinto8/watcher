import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Loader = styled.div`
  width: 140px;
  height: 210px;
  margin-right: 1rem;
  background-color: #FF002E80;
  border-radius: 8px;
  animation: ${fadeInOut} 4s ease-out infinite;

  @media (min-width: 768px) {
    width: 200px;
    height: 300px;
  }

  @media (min-width: 1024px) {
    width: 240px;
    height: 360px;
  }
`;

export default function LoaderItem() {
  return <Loader />;
}
