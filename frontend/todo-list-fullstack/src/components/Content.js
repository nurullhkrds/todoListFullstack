import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from '../page/Home';
import Login from '../page/Login';
import Register from '../page/Register';
import ProtectedLogin from '../components/protected/ProtectedLogin'
import MyProfile from '../page/MyProfile';
function Content() {
  return (
    <div>
        <Routes>
            <Route path='/' Component={Home}/>z
            <Route Component={ProtectedLogin}>
            <Route path='/login' Component={Login}/>
            <Route path='/register' Component={Register}/>
            </Route>
            <Route path='/myprofile' Component={MyProfile}/>
            

        </Routes>


    </div>
  )
}

export default Content