import axios from "axios";
import config from "../../config/config";
const API_URL = `${config.apiUrl}/api/auth/coach/`;

class AuthService {
  constructor() {
    console.log(API_URL)
    this.api = axios.create({
      baseURL: API_URL,
    });
  }

  login(user) {
    console.log(
      "🚀 ~ file: auth.service.js:13 ~ AuthService ~ login ~ user:",
      user
    );
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.api.post("signin", user, config).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return this.api.post("signup", user);
  }
}

export default new AuthService();
