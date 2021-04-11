const BASE_URL = 'http://localhost:3000/v1';

export const environment = {
  production: false
};

export const api = {
  join: {
    signup: `${BASE_URL}/signup`,
    login: `${BASE_URL}/auth/login`,
    verify: `${BASE_URL}/users/verify`,
    forgot: {
      register: `${BASE_URL}/users/forgot`,
      changePassword: `${BASE_URL}/users/change-password/forgot`
    }
  },
  user: {
    get: `${BASE_URL}/users`
  },
  boards: {
    getAll: `${BASE_URL}/boards`
  }
};
