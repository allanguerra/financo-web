const BASE_URL = 'http://localhost:3000/v1';

export const environment = {
  production: false
};

export const api = {
  join: {
    signup: `${BASE_URL}/signup`,
    login: `${BASE_URL}/auth/login`
  }
};
