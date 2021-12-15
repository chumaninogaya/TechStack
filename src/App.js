import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNav from './SidebarNav';
import Home from './pages/Home';
import Supplier from "./pages/Supplier";
import Contractor from "./pages/Contractor";

// import sidebar from "./sidebar";

function App() {
  return (
    <>
    <Router>
      <SideNav/>
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/supplier' component={Supplier}/>
      <Route path='/contractor' component={Contractor}/>
    </Switch>
    </Router>
    </>
  );
}

export default App;


