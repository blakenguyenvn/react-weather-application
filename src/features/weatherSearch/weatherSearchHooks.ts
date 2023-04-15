import {
  selectOptions,
  selectSearchStatus,
  selectStatus,
  selectCurrentData,
  selectCurrentLocation,
  selectForecast,
  searchLocationAsync,
  fetchCurrentWeatherAsync,
} from './weatherSearchSlice';

export const useWeatherSearchHooks = () => {
  return {
    selectors: {
      options: selectOptions,
      searchStatus: selectSearchStatus,
      status: selectStatus,
      currentData: selectCurrentData,
      currentLocation: selectCurrentLocation,
      forecast: selectForecast,
    },
    actions: {
      searchLocationAsync,
      fetchCurrentWeatherAsync,
    },
  };
};
