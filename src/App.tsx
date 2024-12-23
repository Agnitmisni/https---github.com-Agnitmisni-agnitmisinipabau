import React, { useState } from 'react';
import './App.css';
import DataTable from './components/DataTable.tsx';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient.ts';
import { Button } from '@mui/material';

function App() {
  const [isGerman, setIsGerman] = useState(true);

  const toggleLanguage = () => setIsGerman(prevState => !prevState);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Rick & Morty</h1>
        <DataTable language={isGerman ? "de" : "en"} />
        <Button onClick={toggleLanguage} variant="contained">{isGerman ? "Sprache wechseln" : "Change language"}</Button>
      </div>
    </ApolloProvider>
  );
}

export default App;
