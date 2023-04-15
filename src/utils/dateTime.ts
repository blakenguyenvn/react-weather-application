import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const DATE_FORMAT = 'DD MMM YYYY';
export const formatDate = (timestamp: number, timeZone: string) => {
  const dateLocal = dayjs(timestamp);
  const dateTimezone = dateLocal.tz(timeZone);

  return {
    dateTime: dateTimezone.format(DATE_FORMAT),
    weekday: dateTimezone.format('dddd'),
    date: dateTimezone.format('YYYY-MM-DD'),
  };
};
