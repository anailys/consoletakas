export const CategoriesRouter = [
    {
        path: '/administration/categories',
        name: 'categories',
        component: () => import('../../views/categories/List.vue'),
        meta: {
            page_type: 'private',
            app_bar_is_hidden: false,

        }
    },
]
