import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

// styles
import './App.css';
import './index.css'
// -always available- elements
import SideBar from './components/sideBar';
import NavBar from './components/navBar';
import Footer from './components/Footer';
// views
import App from './App'
import Login from './login/login';
import Products from './components/Views/Products'
import Users from './components/Views/Users'
import CategoriesResume from './components/Views/CategoriesResume';
// view for 404
import Notfound from './components/NotFound'

let siteNavigator;

if (localStorage.getItem('login')){
  siteNavigator = (
    <Router>
      <div id="wrapper">
        <SideBar />
          <div id="content">
          <NavBar />
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/products" component={Products} />
              <Route path="/users" component={Users} />
              <Route path="/categories" component={CategoriesResume} />
              <Route component={Notfound} />
            </Switch>
          <Footer />
          </div>
      </div>
    </Router>
  )
}else{
  siteNavigator = (
    <Router>
      <div id="wrapper">
          <div id="">
            <Switch>
              <Login />
              <Route component={Notfound} />
            </Switch>
          <Footer />
          </div>
      </div>
    </Router>
  )
}
ReactDOM.render(siteNavigator, document.getElementById('root'))