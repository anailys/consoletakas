import { Http } from '../AppServices'

export default {

    create: async (data) => {
        data;
        alert('create')

        //return await Http.post({ route: '/', data: {} })
    },
    list: async (data) => {

        let response = await Http.post({
            route: '/admin/listusersconsole', data: data
        })
        return response


    },

    find: async (data) => {

        data;
        alert('find')
        //return await Http.post({ route: '/', data: {} })
    },

    delete: async (data) => {

        data;
        alert('delete')
        //return await Http.post({ route: '/', data: {} })
    },
    update: async (data) => {

        data;
        alert('update')

        //return await Http.post({ route: '/', data: {} })
    }

}