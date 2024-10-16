import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const FPLayout=React.lazy(()=> import("./components/layouts/FPLayout"));
const Employs=React.lazy(()=> import("./components/pages/Employs"));
const Monitor=React.lazy(()=> import("./components/pages/Monitor"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
      <Routes>
        <Route path='/' Component={FPLayout}/>
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
