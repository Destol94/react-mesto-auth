class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }
  _getResponseDate(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers
    })
      .then(res => { return this._getResponseDate(res) })
  }
  patchUserInfo(inputValue, aboutValue) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: `${inputValue}`,
        about: `${aboutValue}`
      })
    })
      .then(res => { return this._getResponseDate(res) })
  }
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers
    })
      .then(res => { return this._getResponseDate(res) })
  }
  patchCard(nameCard, linkCard) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: `${nameCard}`,
        link: `${linkCard}`
      })
    })
      .then(res => { return this._getResponseDate(res) })
  }
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    })
      .then(res => { return this._getResponseDate(res) })
  }
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      credentials: 'include',
      headers: this._headers
    })
      .then(res => { return this._getResponseDate(res) })
  }
  deleteLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    })
      .then(res => { return this._getResponseDate(res) })
  }
  patchAvatar(inputValue) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${inputValue}`
      })
    })
      .then(res => { return this._getResponseDate(res) })
  }
}
const api = new Api({
  baseUrl: 'https://api.project-mesto.nomoredomains.club',
  headers: {
    "Content-Type": "application/json",
  }
});
export default api;