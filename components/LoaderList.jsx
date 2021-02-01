import LoaderItem from './LoaderItem';
import { SectionTitle } from './Text';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 0.5rem 0;
`;

const FlexWrapper = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0 1.25rem;

  @media (min-width: 1024px) {
    padding: 0 1.75rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
`;

export default function LoaderList({ title }) {
  return (
    <Wrapper>
      <SectionTitle>{title}</SectionTitle>
      <FlexWrapper>
        <FlexContainer>
          {[...Array(10).keys()].map(num => (
            <LoaderItem key={num} />
          ))}
        </FlexContainer>
      </FlexWrapper>
    </Wrapper>
  );
}
