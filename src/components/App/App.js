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
import { moviesApi } from "../../utils/MoviesApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltipProfile from "../InfoTooltipProfile/InfoTooltipProfile";

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    localStorage.getItem('checkbox') ? localStorage.getItem('checkbox') : false);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') ? localStorage.getItem('searchQuery') : "");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isEditProfileSuccessful, setIsEditProfileSuccessful] = useState(false);
  const [isProfileInfoTooltipOpen, setIsProfileInfoTooltipOpen] = useState(false);

  const [registerServerError, setRegisterServerError] = useState(null);
  const [loginServerError, setLoginServerError] = useState(null);
  const [editProfileServerError, setEditProfileServerError] = useState(null);
  const [movies, setMovies] = useState(
    localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []);
  const [savedMovies, setSavedMovies] = useState(
    localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : []);


  useEffect(() => {
    if (location.pathname !== '/signin') {
      setLoginServerError(null);
    } else if (location.pathname !== '/signup') {
      setRegisterServerError(null);
    } else if (location.pathname !== '/profile') {
      setEditProfileServerError(null);
    } else {
      return;
    }
  }, [location.pathname])

  useEffect(() => {
    isLoggedIn &&
      getMovies();
      getSavedMovies();
  }, [isLoggedIn]);

  //  useEffect(() => {
  //  getUserInfo();
  //  }, [])

  useEffect(() => {
    localStorage.setItem('checkbox', isCheckboxChecked);
  }, [isCheckboxChecked]);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  // useEffect(() => {
  //   alert(JSON.stringify(currentUser));
  // }, [])

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
      description: movie,
      image: movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function deleteMovie(id) {
    mainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies((savedMovies) => savedMovies.filter((c) => c._id !== id));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      });
  }

  function getMovies() {
    const movies = localStorage.getItem('movies');
    !movies && moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getSavedMovies() {
    const savedMovies = localStorage.getItem('savedMovies');
    !savedMovies && mainApi.getMovies()
      .then((resMovies) => {
        setSavedMovies(resMovies);
        localStorage.setItem('savedMovies', JSON.stringify(resMovies));
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
      .catch(err => {
        console.log(err);
        setRegisterServerError(err);
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
      })
      .then(() => getUserInfo())
      .catch((err) => {
        console.log(err);
        setLoginServerError(err);
      })
  }

  function handleProfileEdit(name, email) {
    mainApi.editProfile(name, email)
      .then((user) => {
        setCurrentUser(user);
        setIsEditProfileSuccessful(true);
        setIsProfileInfoTooltipOpen(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setEditProfileServerError(err);
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
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
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

  useEffect(() => {
    checkJwtToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              movies={movies}
              query={searchQuery}
              setQuery={setSearchQuery}
              deleteMovie={deleteMovie}
              saveMovie={saveMovie}
            />}
          />
          <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              handleCheckbox={handleCheckbox}
              isChecked={isCheckboxChecked}
              isLoggedIn={isLoggedIn}
              handleMenuOpen={handleSideMenuOpen}
              isLoading={isLoading}
              savedMovies={savedMovies}
              deleteMovie={deleteMovie}
              saveMovie={saveMovie}
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
    </CurrentUserContext.Provider>
  );
}

export default App;