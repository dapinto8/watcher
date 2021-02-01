import { render } from '@/test/test-utils';
import MovieList from '@/components/movie/MovieList';
import { useFavoritesContext } from '@/context/favoritesContext';
import { useUser } from '@/context/userContext';

jest.mock('@/context/userContext');
jest.mock('@/context/favoritesContext');

describe('MovieList', () => {
  let expectedProps;
  beforeEach(() => {
    useFavoritesContext.mockReturnValue({
      favorites: [464052,424]
    });

    useUser.mockReturnValue({
      user: {
        id: 1,
        username: 'dapintor8'
      }
    });

    expectedProps = {
      title: 'My list',
      status: 'success',
      error: null,
      movies: [
        {
          id: 464052,
          title: 'Wonder Woman 1984',
          backdrop_path: '/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
          poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg'
        },
        {
          id: 424,
          title: "Schindler's List",
          backdrop_path: '/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg',
          poster_path: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg'
        }
      ]
    };
  });

  test('should render movies with status success', () => {
    const { container, getByText } = render(<MovieList {...expectedProps} />);
    const title = getByText(expectedProps.title);

    expect(title).toBeVisible();
    expect(container.getElementsByClassName('movie').length).toBe(expectedProps.movies.length);
  });

  test('should render error message with status error', () => {
    expectedProps.status = 'error';
    expectedProps.error = {
      message: 'Cannot get movies'
    }

    const { getByText } = render(<MovieList {...expectedProps} />);
    const message = getByText('Ohhh no, it seems there was an error');
    const error = getByText(`Error: ${expectedProps.error.message}`);

    expect(message).toBeVisible();
    expect(error).toBeVisible();;
  });

});
