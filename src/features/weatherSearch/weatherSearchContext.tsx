import React, { useState, createContext } from 'react';

export interface SearchContextData {
  query: string;
  days: number;
  updateSearchQuery: any;
  updateSearchDays: any;
}
const initialState: SearchContextData = {
  query: '',
  days: 5,
  updateSearchQuery: null,
  updateSearchDays: null,
};
export const SearchContext = createContext(initialState);

export const SearchProvider = (props: any) => {
  const { children } = props;
  const [query, setQuery] = useState('');
  const [days, setDays] = useState(1);

  const updateSearchQuery = (text: string) => {
    setQuery(text);
  };

  const updateSearchDays = (days: number) => {
    setDays(days);
  };

  return (
    <SearchContext.Provider value={{ days, query, updateSearchQuery, updateSearchDays }}>
      {children}
    </SearchContext.Provider>
  );
};
