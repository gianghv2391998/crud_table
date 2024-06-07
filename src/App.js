import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Items from './Items';
import Detail from './Detail';

function App() {
  const refetch = false;

  return (
    <Router>
      <div className="container">
        <div className="item">
          <Routes>
            <Route path="/" element={<Items refetch={refetch} />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
