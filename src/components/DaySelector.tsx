import React from 'react';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const DaySelectorWrapper = styled(Stack)`
  padding: 16px;
  width: 100%;
  margin: 8px 0 0;
  .MuiInputBase-root {
    color: #000;
  }
`;

interface DaySelectorProp {
  defaultValue?: any;
  options?: any;
  title?: string;
  selectCallback?: any;
}

export default function DaySelector(props: DaySelectorProp) {
  const { defaultValue, title, options, selectCallback } = props;

  const onSelect = (event: SelectChangeEvent) => {
    selectCallback(event.target?.value);
  };

  return (
    <DaySelectorWrapper spacing={2} sx={{ width: 300 }}>
      <FormControl fullWidth size='small' variant='standard'>
        <InputLabel id='day-select-label' variant='standard' htmlFor='uncontrolled-native'>
          {title}
        </InputLabel>
        <Select
          labelId='day-select-label'
          id='day-select'
          value={defaultValue}
          label={title}
          onChange={onSelect}
        >
          {options?.map((item: any) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DaySelectorWrapper>
  );
}
