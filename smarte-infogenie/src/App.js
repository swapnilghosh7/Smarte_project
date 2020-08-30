import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header  from './components/Header/Header.js';
import IGCompanyDetails  from './components/IGCompanyDetails/IGCompanyDetails.js';

function App() {
  return (
    <div className="App">
      <Header />
      <IGCompanyDetails />
    </div>
  );
}

export default App;
