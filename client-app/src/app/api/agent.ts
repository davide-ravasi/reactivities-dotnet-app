import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get(url).then(responseBody<T>),
  post: <T>(url: string) => axios.post(url).then(responseBody<T>),
  put: <T>(url: string) => axios.put(url).then(responseBody<T>),
  del: <T>(url: string) => axios.delete(url).then(responseBody<T>),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  add: () => requests.post<Activity>(""),
  modify: () => requests.put<Activity>(""),
  delete: () => requests.del<Activity>(""),
};

const Agent = {
  Activities,
};

export default Agent;
