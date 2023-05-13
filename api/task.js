import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com/classes/",
  headers: {
    "X-Parse-Application-Id": "BmWKIlIltwjdkMFK8nUEn8cgXyXUpz0Y0WA4pl16",
    "X-Parse-REST-API-Key": "2Nv6RbU3UAwXTUXXGHLVV6pI0OqlQ0r0mojzqFoT",
  },
});

export const getTasks = () => instance.get("task").then((res) => res.data);

export const updateTask = (task) => {
  return instance.put(`/task/${task.objectId}`, task, {
    headers: { "Content-Type": "application/json" },
  });
};

export const addTask = (task) => {
  const payload = {
    description: task
  }
  return instance.post("/task", payload, {
    headers: { "Content-Type": "application/json" },
  });
};

export const removeTask = (id) => {
  return instance.delete(`/task/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
};

