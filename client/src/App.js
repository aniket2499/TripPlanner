import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navigation from './components/Navigation';
import {AuthProvider} from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';

function App() {
  console.log("App.js");
  return(
    <AuthProvider> 
      <Router>
        <Navigation />
        <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route exact path="/" element={<Home/>} />
        </Route>
        <Route path='/account' element={<PrivateRoute />}>
          <Route path="/account" element={<Account/>} />
        </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>  
    </AuthProvider>
    );
}

export default App;
