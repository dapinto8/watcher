import { render } from '@/test/test-utils';
import MovieHero from '@/components/movie/MovieHero';

describe('MovieHero', () => {
  let expected;
  beforeEach(() => {
    expected = {
      id: 464052,
      backdrop_path: '/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
      genres: [
        { id: 14, name: 'Fantasy' },
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' }
      ],
      poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
      production_companies: [
        {
          id: 9993,
          logo_path: '/2Tc1P3Ac8M479naPp1kYT3izLS5.png',
          name: 'DC Entertainment',
          origin_country: 'US'
        }
      ],
      title: 'Wonder Woman 1984',
      vote_average: 7.1
    };
  });

  test('should render production company, title, genres and vote average', () => {
    const { getByText } = render(<MovieHero movie={expected} />);
    const title = getByText(expected.title);
    const productionCompany = getByText(expected.production_companies[0].name);
    const genres = expected.genres.map(genre => getByText(genre.name));
    const voteAverage = getByText(expected.vote_average);

    expect(title).toBeVisible();
    expect(productionCompany).toBeVisible();
    expect(voteAverage).toBeVisible();
    expect(genres).toHaveLength(expected.genres.length);
    genres.forEach(genre => {
      expect(genre).toBeVisible();
    });
  });
});
