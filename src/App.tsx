
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Meditation from './Meditation'
import Sleep from './Sleep'
import Stress from './stress'
import Journal from './Journal'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/meditation'  element={<Meditation />}/>
        <Route path='/sleep'  element={<Sleep />}/>
        <Route path='/stress'  element={<Stress />}/>
        <Route path='/journal'  element={<Journal />}/>
      </Routes>
    </div>
  );
}

export default App;

