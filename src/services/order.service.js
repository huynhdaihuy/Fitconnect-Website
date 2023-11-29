import createApiClient from "./api.service";
import config from "../../config/config";

class OrderService {
  constructor(baseUrl = `${config.apiUrl}/api/order`) {
    this.api = createApiClient(baseUrl);
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
  async getByCoachId(id) {
    return (await this.api.get(`/coach/${id}`)).data;
  }
  async getByRevenueByDay(month, year, coachId) {
    return (
      await this.api.get(`/revenueByDay/${coachId}?month=${month}&year=${year}`)
    ).data;
  }
  async getByRevenueByMonth(year, coachId) {
    return (await this.api.get(`/revenueByMonth/${coachId}?year=${year}`)).data;
  }
  async getByRevenueByYear(coachId) {
    return (await this.api.get(`/revenueByYear/${coachId}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new OrderService();
