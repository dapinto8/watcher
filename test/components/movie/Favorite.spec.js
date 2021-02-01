import { render, act, fireEvent } from '@/test/test-utils';
import Favorite from '@/components/movie/Favorite';
import { useUser } from '@/context/userContext';
import { markAsFavorite } from '@/api/movie';

jest.mock('@/context/userContext');
jest.mock('@/api/movie');

describe('Favorite', () => {

  beforeEach(() => {
    useUser.mockReturnValue({
      user: {
        id: 1,
        username: 'dapintor8'
      }
    });
    markAsFavorite.mockResolvedValue('');
  });

  test('should toggle heart animation', () => {
    const { getByTestId } = render(<Favorite />);
    const favoriteButton = getByTestId('favorite');

    act(() => {
      fireEvent.click(favoriteButton);
    });

    expect(favoriteButton).toHaveClass('animate-heart');

    act(() => {
      fireEvent.click(favoriteButton);
    });

    expect(favoriteButton).not.toHaveClass('animate-heart');
  });
});
