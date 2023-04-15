import React from 'react';
import './weatherIcon.scss';

interface WeatherIconProp {
  iconClass?: string;
}

export default function WeatherIcon(props: WeatherIconProp) {
  const { iconClass } = props;
  return (
    <div className='weatherIcon'>
      <div className={iconClass || 'sunny'}>
        <div className='inner'></div>
      </div>
    </div>
  );
}
