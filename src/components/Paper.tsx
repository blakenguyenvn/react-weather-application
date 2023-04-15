import React from 'react';
import styled from '@emotion/styled';
import MuiPaper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const PaperContainer = styled(MuiPaper)`
  margin: 16px 0;
  padding: 16px;
  display: block;
  box-shadow: none;
  background: #fff;
  border-radius: 16px;
`;

const PaperTitle = styled(Typography)`
  color: #000;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 16px;
`;

const PaperInner = styled.div`
  margin: 0;
  padding: 8px;
  background: #fff;
  border-radius: 16px;
`;

interface PaperProp {
  style?: object;
  children?: any;
  title?: string;
}

export default function Paper(props: PaperProp) {
  const { title, style, children } = props;
  return (
    <PaperContainer style={style}>
      {title != '' && <PaperTitle variant='h2'>{title}</PaperTitle>}
      <PaperInner>{children}</PaperInner>
    </PaperContainer>
  );
}
