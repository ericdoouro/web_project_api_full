class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _makeRequest(url, options) {
    const token = localStorage.getItem("jwt");

    const requestOptions = {
      ...options,
      headers: {
        ...this._headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };

    return fetch(url, {
      ...requestOptions,
      cache: "no-store",
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Erro: ${res.status}`);
}

  getInitialCards() {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  addNewCard({ name, link }) {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  editUserInfo({ name, about }) {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked
      ? this.likeCard(cardId)
      : this.unlikeCard(cardId);
  }

  likeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  unlikeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  
  updateAvatar(avatarLink) {

  return this._makeRequest(
    `${this._baseUrl}/users/me/avatar`,
    {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }
  );
}
};

const api = new Api({
  baseUrl: import.meta.env.DEV
  ? "http://localhost:3000/api"
  : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;