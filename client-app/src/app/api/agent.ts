import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: any) => axios.get(url).then(responseBody),
  post: (url: any) => axios.post(url).then(responseBody),
  put: (url: any) => axios.put(url).then(responseBody),
  delete: (url: any) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: requests.get("/activities"),
  add: requests.post(""),
  modify: requests.put(""),
  delete: requests.delete(""),
};

const Agent = {
  Activities,
};

export default Agent;
