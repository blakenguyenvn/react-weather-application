import React from 'react';
import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBarWrapper = styled(Stack)`
  padding: 16px;
  width: 100%;
  margin: 8px 0 0;

  .MuiInputBase-root {
    color: #000;
  }

  .MuiInput-root {
    padding-bottom: 6px;
  }
`;

interface SearchBarProp {
  defaultValue?: any;
  options?: any;
  loading?: boolean;
  searchCallback: any;
  selectCallback?: any;
}

export default function SearchBar(props: SearchBarProp) {
  const { options, loading, searchCallback, selectCallback } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchCallback(event.target.value);
  };

  const onSelect = (event: React.SyntheticEvent, value: string | null) => {
    selectCallback(value);
  };

  return (
    <SearchBarWrapper spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        disableClearable
        loading={loading}
        options={options}
        size='small'
        getOptionLabel={(option: any) => option.name || ''}
        onChange={onSelect}
        renderOption={(props: any, option: any) => {
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <FormControl fullWidth>
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              label={'Enter city name to find out weather'}
              onChange={onChange}
              size='medium'
              variant='outlined'
            />
          </FormControl>
        )}
      />
    </SearchBarWrapper>
  );
}
