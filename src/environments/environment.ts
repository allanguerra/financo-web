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
    get: `${BASE_URL}/users`,
    profile: {
      update: `${BASE_URL}/users/:userId/profile`,
      uploadAvatar: `${BASE_URL}/users/:userId/profile/thumbnail`
    }
  },
  boards: {
    getAll: `${BASE_URL}/boards`,
    base: `${BASE_URL}/boards`,
    share: `${BASE_URL}/boards/:boardId/share-to/:email`,
    unshare: `${BASE_URL}/boards/:boardId/unshare/:sharedUser`
  },
  categories: {
    base: `${BASE_URL}/board/:boardId/categories`,
    getByExpense: `${BASE_URL}/board/:boardId/categories/type/expense`,
    getByRevenue: `${BASE_URL}/board/:boardId/categories/type/revenue`
  },
  expenses: {
    base: `${BASE_URL}/board/:boardId/expenses`,
    balance: `${BASE_URL}/board/:boardId/balance/expenses`
  },
  revenues: {
    base: `${BASE_URL}/board/:boardId/revenues`,
    balance: `${BASE_URL}/board/:boardId/balance/revenues`
  },
  dashboard: {
    base: `${BASE_URL}/board/:boardId/dashboard`
  }
};
