import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { getConditionByCode, ConditionType } from 'utils/weatherUtil';
import { formatDate } from 'utils/dateTime';
import Loader from 'components/Loader';
import './weatherWidget.scss';

const WidgetWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const LocationName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;

  .location {
    margin-left: 8px;
  }
`;

const EmptyText = styled.p`
  font-weight: 300;
  font-style: italic;
  padding: 16px;
  color: #000;
  text-align: center;
`;

const ForecastBox = styled.div``;

interface WeekDayType {
  forecastDay?: any;
  timezone?: string | undefined;
}

export const WeekDayForecast = (props: WeekDayType) => {
  const { forecastDay, timezone } = props;

  const dateFormatted = forecastDay
    ? formatDate(forecastDay?.date, timezone || '')
    : { dateTime: '', weekday: '', date: '' };

  return (
    <ForecastBox>
      <DateRangeIcon />
      <span className='day-name' style={{ fontWeight: 'bold' }}>
        {dateFormatted.weekday}
      </span>
      <span className='day-name'>{dateFormatted.dateTime}</span>
      <span className='day-temp'>
        {forecastDay?.day?.mintemp_c} °C - {forecastDay?.day?.maxtemp_c} °C
      </span>
    </ForecastBox>
  );
};

interface WeatherWidgetProp {
  forecast?: any;
  current?: any;
  location?: any;
  loading?: boolean;
}

const initialCondition = {
  code: 1000,
  day: 'Sunny',
  night: 'Clear',
  icon: 113,
  iconclassName: 'sunny',
};

export default function WeatherWidget(props: WeatherWidgetProp) {
  const { forecast, current, location, loading } = props;
  const [conditionData, setConditionData] = useState<ConditionType>(initialCondition);

  useEffect(() => {
    if (current?.condition?.code) {
      const data = getConditionByCode(current?.condition?.code);
      data && setConditionData(data);
    }
  }, [current]);

  const currentDateFormatted = location
    ? formatDate(location?.localtime, location?.tz_id)
    : { dateTime: '', weekday: '', date: '' };

  const forecastDays = forecast ? forecast.forecastday : [];

  return (
    <WidgetWrapper>
      <Grid container className='container'>
        <Grid item xs={12} md={4}>
          <div className='weather-side'>
            <div className='weather-gradient'></div>
            {loading && (
              <Loader
                style={{
                  minWidth: '60px',
                  minHeight: '60px',
                  position: 'absolute',
                  top: '170px',
                }}
              />
            )}
            {!loading && (
              <div>
                {current && (
                  <div className='date-container'>
                    <h2 className='date-dayname'>{currentDateFormatted?.weekday}</h2>
                    <span className='date-day'>{currentDateFormatted?.dateTime}</span>
                    <LocationName>
                      <LocationCityIcon />
                      <span className='location'>{location?.name}</span>
                    </LocationName>
                  </div>
                )}
                <div className='weather-container'>
                  <i className='weather-icon' data-feather='sun'></i>
                  {current && <h1 className='weather-temp'>{`${current?.temp_c}°C`}</h1>}
                  {current && (
                    <h3 className='weather-desc'>
                      <img src={current?.condition?.icon} alt={current?.condition?.text} />
                      {conditionData?.day}
                    </h3>
                  )}
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className='info-side'>
            {loading && (
              <Loader
                style={{
                  minWidth: '60px',
                  minHeight: '60px',
                  position: 'absolute',
                  top: '170px',
                }}
              />
            )}
            {!loading && (
              <div>
                {current ? (
                  <>
                    <div className='today-info-container'>
                      <div className='today-info'>
                        <div className='precipitation'>
                          <span className='title'>PRECIPITATION</span>

                          <span className='value'>
                            {current?.precip_in ? current?.precip_in * 100 : 0} %
                          </span>

                          <div className='clear'></div>
                        </div>
                        <div className='humidity'>
                          <span className='title'>HUMIDITY</span>
                          <span className='value'>
                            {current?.humidity ? current?.humidity : 0} %
                          </span>
                          <div className='clear'></div>
                        </div>
                        <div className='wind'>
                          <span className='title'>WIND</span>
                          {current && <span className='value'>{current?.wind_kph} km/h</span>}
                          <div className='clear'></div>
                        </div>
                      </div>
                    </div>
                    <div className='week-container'>
                      <ul className='week-list'>
                        {forecastDays?.map((forecastDay: any) => (
                          <li
                            className={
                              currentDateFormatted.date === forecastDay.date ? 'active' : ''
                            }
                            key={forecastDay.date_epoch}
                          >
                            <WeekDayForecast forecastDay={forecastDay} timezone={location?.tz_id} />
                          </li>
                        ))}
                        <div className='clear'></div>
                      </ul>
                    </div>
                    <div className='location-container'></div>
                  </>
                ) : (
                  <EmptyText>{'Enter location to observe the Weather information ...'}</EmptyText>
                )}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </WidgetWrapper>
  );
}
