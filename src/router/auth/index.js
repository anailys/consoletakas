export const AuthRouter = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../../views/auth/Login.vue'),
    meta: {
      page_type: 'only_no_auth',
      app_bar_is_hidden: true,

    }
  },
  {
    path: '/admin/administrators',
    name: 'admin-administrators',
    component: () => import('../../views/auth/Administrators.vue'),
    meta: {
      page_type: 'private'

    }
  },

]
