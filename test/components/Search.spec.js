import { render, act, fireEvent } from '@/test/test-utils';
import Search from '@/components/Search';
import { useRouter } from 'next/router';

jest.mock('next/router');

describe('Search', () => {
  let expectedSearchText, expectedRouterPush;
  beforeEach(() => {
    expectedSearchText = 'Batman';
    expectedRouterPush = jest.fn();
    useRouter.mockReturnValue({
      push: expectedRouterPush
    });
  });

  test('should render search component', () => {
    const screen = render(<Search />);

    const searchWrapper = screen.getByTestId('search-wrapper');
    const searchInput = screen.getByPlaceholderText('Search');
    const searchIcon = screen.getByAltText('Search Icon');
    const toggleSearch = searchIcon.parentNode;
    const searchButtonIcon = screen.getByAltText('Search');
    const searchButton = searchButtonIcon.parentNode;

    expect(searchIcon).toBeVisible();
    expect(searchWrapper).toHaveAttribute('display', '0');

    act(() => {
      fireEvent.click(toggleSearch);
      fireEvent.change(searchInput, {
        target: { value: expectedSearchText }
      });
    });

    expect(searchWrapper).toHaveAttribute('display', '1');
    expect(searchInput).toHaveValue(expectedSearchText);

    act(() => {
      fireEvent.click(searchButton);
    });

    expect(expectedRouterPush).toBeCalledTimes(1);
    expect(expectedRouterPush).toBeCalledWith({
      pathname: '/search',
      query: { query: encodeURIComponent(expectedSearchText) }
    });

    // expect(scr).toEqual(true);
  });
});
