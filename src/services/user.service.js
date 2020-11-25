import { authHeader } from "../helpers";
import { api, axiosInstance } from "../api/api";
import { endpoints } from "../api/apiConstants";

export const userService = {
  login,
  logout,
  isValid,
};

function login(data, setUser) {
  return api
    .login(data)
    .then((response) => {
      console.log(response.data);
      const data = response.data;
      if (response.status !== 200) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          //location.reload(true);
        }
        const error = (response && response.status) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    })
    .then((user) => {
      console.log(user);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("token", user["token"]);
      localStorage.setItem("user", JSON.stringify(user));
      setUser({ token: user["token"], user: user });
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function isValid(token) {
  return api.isValid(token);
}
