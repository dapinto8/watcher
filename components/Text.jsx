import styled from 'styled-components';

export const SectionTitle = styled.h2`
  padding: 0 1em;
  margin-bottom: 0.75em;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;

  @media (min-width: 1024px) {
    padding: 0 2em;
  }
`;

