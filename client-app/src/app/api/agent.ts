import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

axios.interceptors.response.use(async (response: AxiosResponse) => {
  try {
    await sleep(1000);
    return response;
  } catch {
    console.log("error");
    return await Promise.reject();
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get(url).then(responseBody<T>),
  post: <T>(url: string, activity: Activity) =>
    axios
      .post(url, {
        ...activity,
        id: undefined,
      })
      .then(responseBody<T>),
  put: <T>(url: string, activity: Activity) =>
    axios.put(url, activity).then(responseBody<T>),
  del: <T>(url: string, id: string) =>
    axios
      .delete(url, {
        data: id,
      })
      .then(responseBody<T>),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) =>
    requests.post<Activity>("/activities", activity),
  update: (activity: Activity) =>
    requests.put<Activity>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<Activity>("/activities", id),
};

const Agent = {
  Activities,
};

export default Agent;
