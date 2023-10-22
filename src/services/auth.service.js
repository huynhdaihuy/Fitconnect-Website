import axios from 'axios';

const API_URL = 'api/users/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', { user })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        console.log(user);
        return axios.post(API_URL + 'signup', user);
    }
}

export default new AuthService();