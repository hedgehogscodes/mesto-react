export default class Api {
  constructor(options) {
    this._token = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-Type"];
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //////////////////Setup User Info////////////////////////////////////
  getUserInfo() {
    return fetch(`${this._token}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Setup Cards ///////////////////////////////////////
  getInitialCards() {
    return fetch(`${this._token}/cards`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse);
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Save user information ////////////////////////////
  saveUserInfo({ name, status }) {
    return fetch(`${this._token}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          about: status
        })
      })
      .then(this._checkResponse);
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Add Card /////////////////////////////////////////
  addCard({ title, link }) {
    return fetch(`${this._token}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: title,
          link: link
        })
      })
      .then(this._checkResponse);
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Del Card /////////////////////////////////////////
  deleteCard(cardId) {
    return fetch(`${this._token}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      })
      .then(this._checkResponse);
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Add Like /////////////////////////////////////////
  addLike(cardId) {
    return fetch(`${this._token}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      })
      .then(this._checkResponse);
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Del Like /////////////////////////////////////////
  deleteLike(cardId) {
    return fetch(`${this._token}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      })
      .then(this._checkResponse);
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Edit Avatar////////////////////////////////////////
  editAvatar(link) {
    return fetch(`${this._token}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          avatar: `${link}`
        })
      })
      .then(this._checkResponse);
  }
   /////////////////////////////////////////////////////////////////////
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '52b3031e-4bbf-4230-9679-707716e24a97',
    'Content-Type': 'application/json'
  }
});