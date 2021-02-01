import styled from 'styled-components';
import { SectionTitle } from '@/components/Text';

const Container = styled.div`
  max-width: 760px;
  padding: 0 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
    font-size: 20px;
  }
`;

const TextBlock = styled.p`
  font-weight: 300;

  a {
    text-decoration: underline;
  }

  span,
  a {
    &:first-child {
      font-weight: 500;
      letter-spacing: 0.5px;
    }
  }
`;

export default function MovieOverview({ movie }) {

  const getStringList = (list, key) => {
    return <span>{list.map(item => item[key]).join(', ')}</span>;
  };

  const toAmount = amount => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <>
      <section>
        <SectionTitle>Overview</SectionTitle>
        <Container>
          <p>{movie.overview}</p>
        </Container>
      </section>
      <section>
        <SectionTitle>Deatils</SectionTitle>
        <Container>
          <TextBlock>
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
              Official site
            </a>
          </TextBlock>
          <TextBlock>
            <span>Release date: </span>
            <span>{movie.release_date}</span>
          </TextBlock>
          <TextBlock>
            <span>Original title: </span>
            <span>{movie.original_title}</span>
          </TextBlock>
          <TextBlock>
            <span>Budget: </span>
            <span>{toAmount(movie.budget)}</span>
          </TextBlock>
          <TextBlock>
            <span>Revenue: </span>
            <span>{toAmount(movie.revenue)}</span>
          </TextBlock>
          <TextBlock>
            <span>Production Co: </span>
            {getStringList(movie.production_companies, 'name')}
          </TextBlock>
          <TextBlock>
            <span>Country: </span>
            {getStringList(movie.production_countries, 'iso_3166_1')}
          </TextBlock>
          <TextBlock>
            <span>Language: </span>
            {getStringList(movie.spoken_languages, 'english_name')}
          </TextBlock>
        </Container>
      </section>
    </>
  );
}
