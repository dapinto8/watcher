import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 240px;
  margin: 1rem 1.25rem;
  padding: 1rem;

  @media (min-width: 1024px) {
    margin: 1rem 1.75rem;
  }
`;

const ErrorTitle = styled.p`
  color: #FF002E;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: white;
  font-size: 0.9rem;
`;

export default function Error({ error = '' }) {
  return (
    <ErrorContainer>
      <ErrorTitle>Ohhh no, it seems there was an error</ErrorTitle>
      <ErrorMessage>Error: {error}</ErrorMessage>
    </ErrorContainer>
  );
}
