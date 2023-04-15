import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  WeatherDataType,
  LocationOptionType,
  fetchCurrentWeather,
  searchLocation,
} from './weatherSearchAPI';

export interface WeatherSearchState {
  data: WeatherDataType;
  options: LocationOptionType[];
  status?: string;
  searchStatus?: string;
}

const initialState: WeatherSearchState = {
  data: {
    location: null,
    current: null,
    forecast: null,
  },
  options: [],
  searchStatus: 'idle',
  status: 'idle',
};

export const searchLocationAsync = createAsyncThunk('weather/searchLocation', async (args: any) => {
  const { query } = args;
  if (query == '') {
    return { options: [] };
  }

  const response = await searchLocation({ query });

  return {
    options: response,
  };
});

export const fetchCurrentWeatherAsync = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (args: any) => {
    const { query } = args;

    const response = await fetchCurrentWeather({ query });

    return {
      data: response,
    };
  },
);

export const weatherSearchSlice = createSlice({
  name: 'weatherSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchLocationAsync.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchLocationAsync.fulfilled, (state, action) => {
        const { options } = action.payload;

        state.options = [...options];
        state.searchStatus = 'idle';
      })
      .addCase(searchLocationAsync.rejected, (state) => {
        state.options = [];
        state.searchStatus = 'failed';
      });

    builder
      .addCase(fetchCurrentWeatherAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentWeatherAsync.fulfilled, (state, action) => {
        const { data } = action.payload;

        state.data = data;
        state.status = 'idle';
      })
      .addCase(fetchCurrentWeatherAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectOptions = (state: RootState) => state.weatherSearch.options;
export const selectSearchStatus = (state: RootState) => state.weatherSearch.searchStatus;
export const selectStatus = (state: RootState) => state.weatherSearch.status;
export const selectCurrentData = (state: RootState) => state.weatherSearch.data?.current;
export const selectCurrentLocation = (state: RootState) => state.weatherSearch.data?.location;
export const selectForecast = (state: RootState) => state.weatherSearch.data?.forecast;

export default weatherSearchSlice.reducer;
