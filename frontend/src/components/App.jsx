import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../utils/api";
import { checkToken, register, authorize } from "../utils/auth";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [popup, setPopup] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsCheckingToken(false);
      return;
    }

    checkToken(token)
      .then(() => {
        return api.getUserInfo();
      })
      .then((userData) => {
        const savedEmail = localStorage.getItem("userEmail");

        setCurrentUser({
          ...userData,
          email: savedEmail,
        });

        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, [history]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const handleUpdateUser = (data) => {
    return api
      .editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        return newData;
      });
  };

  const handleUpdateAvatar = (data) => {
    return api
      .updateAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        return newData;
      });
  };

  async function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);

    try {
      const newCard = await api.changeLikeCardStatus(
        card._id,
        !isLiked
      );

      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id
            ? newCard
            : currentCard
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit({ name, link }) {
    const newCard = await api.addNewCard({ name, link });

    setCards((state) => [newCard, ...state]);

    return newCard;
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
  }

  async function handleConfirmDelete() {
    try {
      await api.deleteCard(cardToDelete._id);

      setCards((state) =>
        state.filter(
          (currentCard) => currentCard._id !== cardToDelete._id
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setCardToDelete(null);
    }
  }

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleRegister({ email, password }) {
    return register(email, password)
      .then(() => {
        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleLogin({ email, password }) {
    return authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("userEmail", email);

        return api.getUserInfo();
      })
      .then((userData) => {
        setCurrentUser({
          ...userData,
        email,
      });

        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (isCheckingToken) {
    return null;
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userEmail");
    setCurrentUser({});
    setIsLoggedIn(false);
    history.push("/signin");
  }

  return (
    <>
      <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleCloseInfoTooltip}
          isSuccess={isRegistrationSuccess}
        />
      <Switch>
        <Route path="/signin">
          <Header
            authText="Entrar"
            authLink="/signup"
          />
          
          <Login onLogin={handleLogin} />
        </Route>

        <Route path="/signup">
          <Header
            authText="Faça o login"
            authLink="/signin"
          />

          <Register onRegister={handleRegister} />
        </Route>

        <ProtectedRoute
          path="/"
          isLoggedIn={isLoggedIn}
        >
          <CurrentUserContext.Provider
            value={{
              currentUser,
              handleUpdateUser,
              handleUpdateAvatar,
            }}
          >
            <div className="page__content">
              <Header 
                email={currentUser.email}
                onSignOut={handleSignOut} 
              />

              <Main
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                popup={popup}
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                cardToDelete={cardToDelete}
                onConfirmDelete={handleConfirmDelete}
              />

              <Footer />
            </div>
          </CurrentUserContext.Provider>
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;