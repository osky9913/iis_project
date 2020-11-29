import axios from "axios";
import { endpoints, url, headers } from "./apiConstants";
import * as https from "https";

export const axiosInstance = axios.create({
  baseURL: url,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers: headers.basic,
});

export const api = {
  getAllUsers: () =>
    axiosInstance
      .get(endpoints.user)
      .then((res) => res.data)
      .catch((err) => console.error(err)),

  getUserDetailed: () =>
    axiosInstance
      .get(endpoints.user)
      .then((res) => res.data)
      .catch((err) => console.error(err)),

  getFestival: () =>
    axiosInstance
      .get(endpoints.festival)
      .then((res) => res.data)
      .catch((err) => console.error(err)),
  getInterpret: () =>
    axiosInstance
      .get(endpoints.interpret)
      .then((res) => res.data)
      .catch((err) => console.error(err)),
  getReservation: () =>
    axiosInstance
      .get(endpoints.reservation)
      .then((res) => res.data)
      .catch((err) => console.error(err)),
  getStage: () =>
    axiosInstance
      .get(endpoints.stage)
      .then((res) => res.data)
      .catch((err) => console.error(err)),
  login: (data) => axiosInstance.post(endpoints.userAuthenticate, data),
  logout: () => {
    localStorage.clear();
  },
  isValid: (token) => {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
    return axiosInstance.get(endpoints.validate);
  },
  deleteTokenFromHeader: () =>
    (axiosInstance.defaults.headers.common["Authorization"] = ""),
  getFestivalByID: (ID) => axiosInstance.get(endpoints.festival + "/" + ID),
  getInterpretByID: (ID) => axiosInstance.get(endpoints.interpret + "/" + ID),
  getStageByID: (ID) => axiosInstance.get(endpoints.stage + "/" + ID),
};

export const apiAll = () => {
  let responses = [];
  axios
    .all([
      api.getFestival(),
      api.getInterpret(),
      api.getStage(),
      api.getReservation(),
    ])
    .then((respond) => {
      responses.push(respond);
    });
  return responses;
};
