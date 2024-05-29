import React, { useState } from 'react';
import './App.css';
import Title from './title';
import Add from './add';
import Item from './item';

function App() {

  const [refetch, setRefetch] = useState(false)

  const handleAddPost = () => {
    // Force re-render App component
    window.location.reload();
  };

  return (
    <div className='container'>
      <Title />
      <div className='add'>
        <Add
          handleAddPost={handleAddPost}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      </div>
      <div className='item'>
        <Item refetch={refetch} />
      </div>
    </div>
  );
}


export default App;