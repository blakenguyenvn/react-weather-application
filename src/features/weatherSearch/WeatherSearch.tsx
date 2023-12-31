import React, { useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SearchBar from 'components/SearchBar';
import Paper from 'components/Paper';
import WeatherWidget from 'components/weatherWidget/WeatherWidget';
import { STATUSES, SITE_CONTENT } from 'utils/config';
import { SearchContext } from './weatherSearchContext';
import { useWeatherSearchHooks } from './weatherSearchHooks';

export default function WeatherSearch() {
  const { query, days, updateSearchQuery } = useContext(SearchContext);
  const dispatch = useAppDispatch();
  const { selectors, actions } = useWeatherSearchHooks();

  const searchStatus = useAppSelector(selectors.searchStatus);
  const status = useAppSelector(selectors.status);
  const options = useAppSelector(selectors.options);
  const currentData = useAppSelector(selectors.currentData);
  const currentLocation = useAppSelector(selectors.currentLocation);
  const forecast = useAppSelector(selectors.forecast);

  const handleSearchInput = (text: string) => {
    dispatch(actions.searchLocationAsync({ query: text }));
  };

  const handleSelectLocation = (item: any) => {
    if (item) {
      updateSearchQuery(item.name);
      dispatch(actions.fetchCurrentWeatherAsync({ query: item.name, days }));
    }
  };

  const observeWeather = () => {
    if (query) {
      dispatch(actions.fetchCurrentWeatherAsync({ query, days }));
    }
  };

  useEffect(() => {
    if (query) {
      dispatch(actions.fetchCurrentWeatherAsync({ query, days }));
    }
  }, [])

  return (
    <>
      <Paper title={''}>
        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
          <Grid item xs={8}>
            <SearchBar
              defaultValue={query}
              options={options}
              searchCallback={handleSearchInput}
              selectCallback={handleSelectLocation}
              loading={searchStatus == STATUSES.loading}
            />
          </Grid>
          <Grid style={{ display: 'flex' }} item justifyContent='center' xs={12}>
            <Button style={{ width: '200px' }} className='location-button' onClick={observeWeather}>
              <span>{SITE_CONTENT.refresh}</span>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid
        style={{ margin: '32px 0' }}
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid style={{ display: 'flex', padding: '0' }} item justifyContent='center' xs={12}>
          <WeatherWidget
            loading={status == STATUSES.loading}
            current={currentData}
            forecast={forecast}
            location={currentLocation}
          />
        </Grid>
      </Grid>
    </>
  );
}
