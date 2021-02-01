import { render } from '@/test/test-utils';
import MovieOverview from '@/components/movie/MovieOverview';

const getStringList = (list, key) => {
  return list.map(item => item[key]).join(', ');
};

const toAmount = amount => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};

describe('MovieOverview', () => {
  let expected;
  beforeEach(() => {
    expected = {
      backdrop_path: '/wzJRB4MKi3yK138bJyuL9nx47y6.jpg',
      budget: 205000000,
      genres: [
        { id: 28, name: 'Action' },
        { id: 53, name: 'Thriller' },
        { id: 878, name: 'Science Fiction' }
      ],
      homepage: 'https://www.tenetfilm.com/',
      id: 577922,
      original_title: 'Tenet',
      overview:
        'Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
      poster_path: '/k68nPLbIST6NP96JmTxmZijEvCA.jpg',
      production_companies: [
        {
          id: 9996,
          logo_path: '/3tvBqYsBhxWeHlu62SIJ1el93O7.png',
          name: 'Syncopy',
          origin_country: 'GB'
        },
        {
          id: 174,
          logo_path: '/ky0xOc5OrhzkZ1N6KyUxacfQsCk.png',
          name: 'Warner Bros. Pictures',
          origin_country: 'US'
        }
      ],
      production_countries: [
        { iso_3166_1: 'GB', name: 'United Kingdom' },
        { iso_3166_1: 'US', name: 'United States of America' }
      ],
      release_date: '2020-08-22',
      revenue: 363129000,
      spoken_languages: [
        { english_name: 'English', iso_639_1: 'en', name: 'English' }
      ],
      title: 'Tenet',
      vote_average: 7.3
    };
  });

  test('should render movie overview', () => {
    const { getByText } = render(<MovieOverview movie={expected} />);

    const overview = getByText(expected.overview);
    const officialSite = getByText('Official site');
    const releaseDate = getByText(expected.release_date);
    const originalTitle = getByText(expected.original_title);
    const budget = getByText(toAmount(expected.budget));
    const revenue = getByText(toAmount(expected.revenue));
    const production = getByText(getStringList(expected.production_companies, 'name'));
    const country = getByText(getStringList(expected.production_countries, 'iso_3166_1'));
    const language = getByText(getStringList(expected.spoken_languages, 'english_name'));

    expect(overview).toBeVisible();
    expect(officialSite).toBeVisible();
    expect(releaseDate).toBeVisible();
    expect(originalTitle).toBeVisible();
    expect(budget).toBeVisible();
    expect(revenue).toBeVisible();
    expect(production).toBeVisible();
    expect(country).toBeVisible();
    expect(language).toBeVisible();

  });
});
