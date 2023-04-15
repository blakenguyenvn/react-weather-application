import React from 'react';
import styled from '@emotion/styled';
import logo from 'assets/logo.png';

const LogoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SiteName = styled.h1`
  display: inline;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 0 16px;
  line-height: 1;
  font-size: 32px;
`;

interface LogoProp {
  title: string;
  width?: number;
}

export default function Logo(props: LogoProp) {
  const { title, width } = props;
  return (
    <LogoWrapper>
      <img src={logo} alt={title} width={width} />
      <SiteName>{title}</SiteName>
    </LogoWrapper>
  );
}
