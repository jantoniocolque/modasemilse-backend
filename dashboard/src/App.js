import React from 'react';
import './App.css';
import SideBar from './components/sideBar';
import NavBar from './components/navBar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

//Pages
import Login from './login/login';

function App() {
  return (
    <div id="wrapper">
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/home" exact={true}>
            <SideBar />
            <div id="content">
              <NavBar />
              <Dashboard />     
              <Footer />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
