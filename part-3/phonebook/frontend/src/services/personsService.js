import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const update = async (id, numberObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, numberObj);
  return res.data;
};

export default {
  getAll,
  create,
  update,
  deletePerson,
};
