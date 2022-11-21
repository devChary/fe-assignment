import React, { useEffect } from 'react';

import { useQuery } from './utils';
import { hot } from "react-hot-loader";

function App() {
  
  const {data, error, isError, isLoading } = useQuery('ports');
  return (
    <div className="App">
      <h1>Start of an era</h1>
    </div>
  );
}

export default hot(module)(App);
