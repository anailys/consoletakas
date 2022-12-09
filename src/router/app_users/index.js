export const AppUsersRouter = [

    {
        path: '/admin/app-users',
        name: 'admin-app-users',
        component: () => import('../../views/administration/AppUsers.vue'),
        meta: {
            page_type: 'private'

        }
    },

    {
        path: '/admin/app-users/:id',
        name: 'admin-profile-app-users',
        component: () => import('../../views/app_users/UserProfile.vue'),
        meta: {
            page_type: 'private'

        }
    },


]
