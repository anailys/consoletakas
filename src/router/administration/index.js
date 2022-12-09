export const AdministrationRouter = [
    {
        path: '/administration/PQRS',
        name: 'PQRS',
        component: () => import('../../views/administration/PQRS.vue'),
        meta: {
            page_type: 'private',
            app_bar_is_hidden: false,

        }
    },
]
