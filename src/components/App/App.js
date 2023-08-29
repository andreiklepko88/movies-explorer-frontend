import "./App.css";
// import Preloader from "../Preloader/Preloader";
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound.js";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import SideMenu from "../SideMenu/SideMenu";
import { mainApi } from "../../utils/MainApi";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import IsLoggedInContext from "../../contexts/IsLoggedInContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltipProfile from "../InfoTooltipProfile/InfoTooltipProfile";

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    localStorage.getItem('checkbox') ? JSON.parse(localStorage.getItem('checkbox')) : false);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') ? localStorage.getItem('searchQuery') : '');
  // localStorage.getItem('searchQuery') ?? ''
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isEditProfileSuccessful, setIsEditProfileSuccessful] = useState(false);
  const [isProfileInfoTooltipOpen, setIsProfileInfoTooltipOpen] = useState(false);

  const [registerServerError, setRegisterServerError] = useState(null);
  const [loginServerError, setLoginServerError] = useState(null);
  const [editProfileServerError, setEditProfileServerError] = useState(null);
  

  
  const [savedMovies, setSavedMovies] = useState(
    localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : []);
  const [queryMovies, setQueryMovies] = useState(
    localStorage.getItem('queryMovies') ? JSON.parse(localStorage.getItem('queryMovies')) : []);
  const [savedQueryMovies, setSavedQueryMovies] = useState([]);

  useEffect(() => {
    checkJwtToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (location.pathname !== '/signin') {
      setLoginServerError(null);
    } else if (location.pathname !== '/signup') {
      setRegisterServerError(null);
    } else if (location.pathname !== '/profile') {
      setEditProfileServerError(null);
    } else if (location.pathname !== '/movies') {
      // setMovieError(null);
    } else {
      return;
    }
  }, [location.pathname])

  useEffect(() => {
    isLoggedIn &&
      getSavedMovies();
  }, [isLoggedIn]);

  // useEffect(() => {
  //     getMovies();
  // }, [location.pathname === '/movies']);

  useEffect(() => {
    localStorage.setItem('checkbox', JSON.stringify(isCheckboxChecked));
  }, [isCheckboxChecked]);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    console.log('effect')
    localStorage.setItem('queryMovies', JSON.stringify(queryMovies));
  }, [queryMovies]);

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);



  function closeAllPopups() {
    setIsSideMenuOpen(false);
    setIsProfileInfoTooltipOpen(false);
  }

  function saveMovie(movie) {
    mainApi.saveMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function deleteMovie(id) {
    mainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies((savedMovies) => savedMovies.filter((c) => c._id !== id));
        setSavedQueryMovies((savedQueryMovies) => savedQueryMovies.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  

  function getSavedMovies() {
    mainApi.getMovies()
      .then((filteredMovies) => {
        console.log(filteredMovies)
        setSavedMovies(filteredMovies);
        localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUserRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then((newUser) => {
        setRegisterServerError(null);
        handleLogIn(email, password);
        setCurrentUser(newUser);
      })
      .catch(async (err) => {
        console.log(err);
        const { message } = await err.json();
        setRegisterServerError(message);
        // setInfoTooltipOpen(true);
        // setRegisterSuccessful(false);
      })
  }

  function handleLogIn(email, password) {
    mainApi.login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setLoginServerError(null);
        navigate('/movies');
        getUserInfo();
      })
      .catch(async (err) => {
        const { message } = await err.json();
        console.log(err);
        setLoginServerError(message);
      })
  }

  function handleProfileEdit(name, email) {
    mainApi.editProfile(name, email)
      .then((user) => {
        setCurrentUser(user);
        setIsEditProfileSuccessful(true);
        setIsProfileInfoTooltipOpen(true);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        console.log(err);
        setEditProfileServerError(message);
        setIsEditProfileSuccessful(false);
        setIsProfileInfoTooltipOpen(true);

      })
  }

  function handleCheckbox() {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  function handleSideMenuOpen() {
    return setIsSideMenuOpen(true);
  }

  function handleLogOut() {
    mainApi.logOut()
      .then(() => {
        setIsLoggedIn(false);
        setIsCheckboxChecked(false);
        setSearchQuery('');
        // setMovies([]);
        localStorage.removeItem('movies')
        setSavedMovies([]);
        setQueryMovies([]);
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      })
  }

  function getUserInfo() {
    mainApi.getUserData()
      .then((resUser) => {
        setCurrentUser(resUser);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function checkJwtToken() {
    mainApi.checkToken()
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
        navigate(location.pathname);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <div className="page">
          <Routes>
            <Route path="/" element={
              <Main
                isLoggedIn={isLoggedIn}
                handleMenuOpen={handleSideMenuOpen}
              />}
            />
            <Route path="/movies" element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                handleCheckbox={handleCheckbox}
                isChecked={isCheckboxChecked}
                handleMenuOpen={handleSideMenuOpen}
                isLoading={isLoading}
                savedMovies={savedMovies}
                // movies={movies}
                query={searchQuery}
                setQuery={setSearchQuery}
                deleteMovie={deleteMovie}
                saveMovie={saveMovie}
                queryMovies={queryMovies}
                setQueryMovies={setQueryMovies}
                setIsLoading={setIsLoading}
                // setMovies={setMovies}
                // getMovies={getMainMovies}
                // movieError={movieError}
                // setMovieError={setMovieError}
              />}
            />
            <Route path="/saved-movies" element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                handleMenuOpen={handleSideMenuOpen}
                isLoading={isLoading}
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
                setIsLoading={setIsLoading}
                savedQueryMovies={savedQueryMovies}
                setSavedQueryMovies={setSavedQueryMovies}
                // getMovies={getMainMovies}
                setMovieError={() => {}}
              />}
            />
            <Route path="/profile" element={
              <ProtectedRoute
                element={Profile}
                handleMenuOpen={handleSideMenuOpen}
                logOut={handleLogOut}
                isLoggedIn={isLoggedIn}
                onEdit={handleProfileEdit}
                onError={editProfileServerError}
              />}
            />
            <Route path="/signin" element={isLoggedIn ? <Navigate to="/" replace />
              :
              <Login
                onSubmit={handleLogIn}
                onError={loginServerError}
              />}
            />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" replace />
              :
              <Register
                onSubmit={handleUserRegister}
                onError={registerServerError}
              />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <SideMenu
            isSideMenuOpen={isSideMenuOpen}
            onCloseMenu={closeAllPopups}
          />

          <InfoTooltipProfile
            isOpen={isProfileInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccessful={isEditProfileSuccessful}
          />

        </div>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;