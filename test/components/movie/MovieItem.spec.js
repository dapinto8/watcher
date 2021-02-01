import { render, act, fireEvent } from '@/test/test-utils';
import MovieItem from '@/components/movie/MovieItem';
import { useRouter } from 'next/router';
import { useUser } from '@/context/userContext';

jest.mock('@/context/userContext');
jest.mock('next/router');

describe('MovieItem', () => {
  let expectedMovie, expectedRouterPush;

  beforeEach(() => {
    expectedRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: expectedRouterPush });

    useUser.mockReturnValue({
      user: {
        id: 1,
        username: 'dapintor8'
      }
    });

    expectedMovie = {
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
  test('should render movie and redirect on click', () => {
    const { getByText, getByTestId } = render(
      <MovieItem movie={expectedMovie} />
    );

    const movie = getByTestId('movie');
    const title = getByText(expectedMovie.title);
    expect(movie).toBeVisible();
    expect(title).toBeVisible();

    act(() => {
      fireEvent.click(movie);
    });

    expect(expectedRouterPush).toHaveBeenCalledTimes(1);
    expect(expectedRouterPush).toHaveBeenCalledWith(
      `/movie/${encodeURIComponent(expectedMovie.id)}`
    );
  });
});
