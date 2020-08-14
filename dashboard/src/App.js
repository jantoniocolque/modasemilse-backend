import React from 'react';
import './App.css';
import SideBar from './components/sideBar';
import NavBar from './components/navBar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content">
        <NavBar />
        <Dashboard />
        <Footer />
      </div>
    </div>
  );
}

export default App;
