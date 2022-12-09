import { Http } from '../AppServices'

export default {

    create: async (data) => {

        return await Http.post({ route: '/admin/createcategory', data: data })

    },

    list: async (data) => {

        return await Http.post({ route: '/admin/listcategorys', data: data })

    },

    findBy: async (data) => {

        data;
        alert('find')
        //return await Http.post({ route: '/', data: {} })
    },

    delete: async (data) => {

        return await Http.post({ route: '/admin/deletecategory', data: data })
    },
    update: async (data) => {

        return await Http.post({ route: '/admin/updatecategory', data: data })
    }

}