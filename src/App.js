import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Login from "./views/login";
import Home from "./views/home";
import SignUp from "./views/signUp";
import Controluser from "./views/controluser";
import ControluserEdit from "./views/editUser";
import DonwloadData from "./views/descargas";

function App(){
  return (
    <Router>
      <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/controluser" component={Controluser} />
          <Route exact path="/controluser/edit" component={ControluserEdit} />
          <Route exact path="/donwload/data" component={DonwloadData} />
      </div>
    </Router>
  );
}

export default App;
