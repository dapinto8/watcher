import styled from 'styled-components';

const Loader = styled.div`
  width: 140px;
  height: 210px;
  margin-right: 1em;
  background-color: ${({ theme }) => theme.colors.primary}80;
  border-radius: 8px;

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
