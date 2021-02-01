import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IconButton } from './Button';

const SearchWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 72px;
  ${({ display }) => (display ? 'max-height: 72px;' : 'max-height: 0px;')}
  text-align: center;
  background-color: rgb(255 0 46 / 80%);
  transition: all 200ms ease-out 100ms;
`;

const SearchField = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 1rem;
  transition: opacity 100ms ease-out;
  ${({ display }) => (display ? 'opacity: 1;' : 'opacity: 0;' )}

  [data-suffix] {
    position: absolute;
    top: 50%;
    right: 1.25rem;
    transform: translateY(-50%);
  }
`;

const SearchFieldLabel = styled.label`
  display: block;
  width: 0;
  height: 0;
  overflow: hidden;
`;

const SearchFieldInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0.5rem 1.25rem;
  border-radius: 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #020414;

  &::placeholder {
    color: white;
  }
`;

export default function SearchComponent() {
  const router = useRouter();
  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const search = () => {
    if (searchText) {
      router.push({
        pathname: '/search',
        query: { query: encodeURIComponent(searchText) }
      });
    }
  }

  const onChange = event => {
    setSearchText(event.target.value);
  };

  const onkeyPressed = event => {
    if (event.key === 'Enter') {
      search();
    }
  };
  

  return (
    <div>
      <IconButton onClick={() => setDisplaySearch(!displaySearch)}>
        <img src="/icons/search.svg" alt="Search Icon" />
      </IconButton>
      <SearchWrapper data-testid="search-wrapper" display={displaySearch ? 1 : 0}>
        <SearchField display={displaySearch ? 1 : 0}>
          <SearchFieldLabel htmlFor="search">Search</SearchFieldLabel>
          <SearchFieldInput
            id="search"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={onChange}
            onKeyPress={onkeyPressed}
          />
          <IconButton data-suffix onClick={search}>
            <img src="/icons/search.svg" alt="Search" />
          </IconButton>
        </SearchField>
      </SearchWrapper>
    </div>
  );
}
