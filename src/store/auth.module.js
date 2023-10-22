import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user, itemsCart: [], quantity: [] } : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        addItemCart({ commit }, product) {
            commit('addItemCartSucess', product);
        },
        deleteItemCart({ commit }, index) {
            commit('deleteItemCart', index);
        },
        orderItemCart({ commit }, cart) {
            commit('orderItemCart', cart);
        },
        orderItemRecommendCart({ commit }, cart) {
            commit('orderItemRecommendCart', cart);
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.itemsCart = [];
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        addItemCartSucess(state, product) {
            state.itemsCart.push(product);
            localStorage.setItem('CartItems', JSON.stringify(state.itemsCart));
        },
        orderItemCart(state, cart) {
            state.itemsCart = cart;
        },
        orderItemRecommendCart(state, cart) {
            state.itemsCart = cart.productCart;
            state.quantity = cart.quantityCart;
        },
    }
};