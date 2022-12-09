export const DefaultModuleRouter = [
    {
        path: '/default_module',
        name: 'default-module',
        component: () => import('../../views/default_module/List.vue'),
        meta: {
            page_type: 'private',
            app_bar_is_hidden: false,

        }
    },
]
