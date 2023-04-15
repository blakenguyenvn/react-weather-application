import React from 'react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const WeatherCardWrapper = styled(Card)`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: none;
  transition: all linear 0.2s;
`;

const WeatherCardContent = styled(CardContent)`
  width: 100%;
  padding: 8px;
  transition: all linear 0.2s;

  &:last-child {
    padding-bottom: 16px;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  border-bottom: solid 2px #eee;
`;

const DetailSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`;

const CaptionTypography = styled(Typography)`
  font-size: 14px;
  font-weight: bold;
`;

const TitleTypography = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  display: block;
  padding: 8px;
`;

interface WeatherCardProp {
  data: any;
  location: any;
}
export default function WeatherCard(props: WeatherCardProp) {
  const { data, location } = props;

  return (
    <WeatherCardWrapper>
      <TitleTypography>
        {location?.name || 'No Data'}
        {location ? ` (${location?.country}) ` : ''}
      </TitleTypography>
      <WeatherCardContent>
        <Heading>
          <CaptionTypography>{data?.last_updated}</CaptionTypography>
        </Heading>
        <DetailSection>
          <img src={data?.condition?.icon} />
          <CaptionTypography variant='caption' display='block' gutterBottom>
            {data?.condition?.text}
          </CaptionTypography>
        </DetailSection>
      </WeatherCardContent>
    </WeatherCardWrapper>
  );
}
