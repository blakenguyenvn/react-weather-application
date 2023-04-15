import React from 'react';
import Container from '@mui/material/Container';
import PageContent from 'components/PageContent';
import { SearchProvider } from 'features/weatherSearch//weatherSearchContext';
import WeatherSearch from 'features/weatherSearch/WeatherSearch';
import './HomePage.scss';

function HomePage() {
  return (
    <SearchProvider>
      <PageContent>
        <Container>
          <WeatherSearch />
        </Container>
      </PageContent>
    </SearchProvider>
  );
}

export default HomePage;
