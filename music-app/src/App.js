import {
  NavBar,
  Home,
  Songs,
  Search,
  LogIn,
  SignUp,
  Profile,
  SongsPlaylist,
} from "./components";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthProvider } from "./components/contexts/AuthContext";
import { MainProvider } from "./components/contexts/MainProvider";
import './App.css'
import { StateProvider } from "./components/contexts/StateProvider";
import reducer, { initialState } from "./components/contexts/reducer";

export const ThemeContext = createContext({});

function App() {
  return (
    <AuthProvider>
      {/* <StateProvider initialState={initialState} reducer={reducer}> */}
      <MainProvider>

        <div className="App">
          <BrowserRouter>
            <NavBar />
            <Profile />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/albums">
                <Route path=":id" element={<Songs />}></Route>
              </Route>
              <Route path="/playlist">
                <Route path=":id" element={<SongsPlaylist />}></Route>
              </Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/login" element={<LogIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
          </BrowserRouter>
        </div>

      </MainProvider>
      {/* </StateProvider> */}
    </AuthProvider >
  );
}

export default App;
