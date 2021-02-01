import styled from 'styled-components';

export const Button = styled.button`
  margin-top: 1em;
  padding: 1rem 1.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  background-color: #FF002E;
  color: white;
  text-transform: uppercase;

  &[disabled=true] {
    background-color: #020414;
  }
`;

export const IconButton = styled.button`
  padding: 0.5rem 0;
  background-color: transparent;

  img {
    width: 20px;
    height: 20px;
  }
`;