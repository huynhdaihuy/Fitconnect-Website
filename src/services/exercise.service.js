import axios from "axios";
import config from "../../config/config";

function callApi(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}
class ExerciseService {
  constructor(baseUrl = `${config.apiUrl}/api/exercise`) {
    this.api = callApi(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async getByCoachId(coachId) {
    return (await this.api.get(`/coach/${coachId}`)).data;
  }
  async getByCategory(category) {
    return (await this.api.get(`/category/${category}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new ExerciseService();
