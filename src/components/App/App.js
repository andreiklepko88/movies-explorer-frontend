import "./App.css";
// import Preloader from "../Preloader/Preloader";
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound.js";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import SideMenu from "../SideMenu/SideMenu";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckboxOn, setIsCheckboxOn] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  function handleCheckbox() {
    setIsCheckboxOn(!isCheckboxOn);
  }

  function handleLogIn() {
    return setIsLoggedIn(true);
  }

  function handleLogOut() {
    return setIsLoggedIn(false);
  }

function handleSideMenuOpen() {
return setIsSideMenuOpen(true);
}

function handleSideMenuClose() {
  return setIsSideMenuOpen(false);
}

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <Main
          isLoggedIn={ isLoggedIn }
          handleMenuOpen={ handleSideMenuOpen }
          isSideMenuOpen={ isSideMenuOpen }
          />}
        />
        <Route path="/movies" element={
          <Movies
            handleCheckbox={handleCheckbox}
            isLoggedIn={ isLoggedIn }
            handleMenuOpen={ handleSideMenuOpen }
            isSideMenuOpen={ isSideMenuOpen }
          />} 
        />
        <Route path="/saved-movies" element={
          <SavedMovies
            handleCheckbox={handleCheckbox}
            isLoggedIn={ isLoggedIn }
            handleMenuOpen={ handleSideMenuOpen }
            isSideMenuOpen={ isSideMenuOpen }
          />}
        />
        <Route path="/signin" element={
          <Login
          handleLogIn={handleLogIn}
          />}
        />
        <Route path="/signup" element={
          <Register/>} 
        />
        <Route path="/profile" element={
          <Profile
          handleMenuOpen={ handleSideMenuOpen }
          logOut={handleLogOut}
          isLoggedIn={ isLoggedIn }
          isSideMenuOpen={ isSideMenuOpen }
          />}
        />
        <Route path="*" element={<NotFound/>} />
      </Routes>

      <SideMenu 
      isSideMenuOpen={ isSideMenuOpen }
      onCloseMenu={ handleSideMenuClose }
      />

    </div>
  );
}

export default App;
