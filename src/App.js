import React from 'react';
import './App.css';
import Title from './Title';
import Items from './Items';


function App() {

  const refetch = false

  return (
    <div className='container'>
      <Title />
      <div className='item'>
        <Items refetch={refetch} />
      </div>
    </div>
  );
}


export default App;