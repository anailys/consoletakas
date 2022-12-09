export const TakasRouter = [
  {
    name: 'takas',
    path: '/takas',
    meta: {
      page_type: 'private'
    },
    component: () => import('../../views/takas/Takas.vue'),
  },
  {
    path: '/users/:user_id/takas/publications',
    name: 'user-takas-publications',
    meta: {
      page_type: 'private'
    },

    component: () => import('../../views/app_users/takasting/TakasPublications.vue'),
  },
  {
    path: '/users/:user_id/takas/takasting',
    name: 'user-takas-takasting',
    meta: {
      page_type: 'private'
    },

    component: () => import('../../views/app_users/takasting/Takastings.vue'),
  }

]