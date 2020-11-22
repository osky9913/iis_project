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
  isValid: (token) => {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
    return axiosInstance.get(endpoints.validate);
  },
  deleteTokenFromHeader: () =>
    (axiosInstance.defaults.headers.common["Authorization"] = ""),
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
