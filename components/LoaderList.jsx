import LoaderItem from '@/components/LoaderItem';
import { SectionTitle } from '@/components/Text';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 0.5em 0;
`;

const FlexWrapper = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0 1.25em;
  
  @media (min-width: 1024px) {
    padding: 0 1.75em;
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
          {[...Array(10).keys()].map((num) => (
            <LoaderItem key={num} />
          ))}
        </FlexContainer>
      </FlexWrapper>
    </Wrapper>
  );
}
