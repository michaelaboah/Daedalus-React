import React from "react"
import { Route, Routes as Switch, BrowserRouter, Link } from "react-router-dom"
import { Header } from "./components/Header"
import { Bye } from "./pages/Bye"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"

export const Routes = () => {

    return(
    <BrowserRouter>
      <div>
        <Header/>
        <Switch>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/bye" element={<Bye/>}/>
        </Switch>
      </div>
    </BrowserRouter>
    )
  }

