const BASE_URL = 'https://api.project-mesto.nomoredomains.club';

export const authorization = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": `${password}`,
      "email": `${email}`
    })
  })
  return checkResposne(res);
}
export const registration = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        "password": `${password}`,
        "email": `${email}`
      }
    )
  })
  return checkResposne(res);
}

export const tokenCheck = async (JWT) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JWT}`
    }
  })
  return checkResposne(res);
}

const checkResposne = res => {
  return res.ok ? res.json() : Promise.reject(`${res.statusText}`);
}