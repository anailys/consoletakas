import { Http } from '../AppServices'

export default {

    createAppUser: async (data) => {
        data;
        alert('create')

        //return await Http.post({ route: '/', data: {} })
    },
    listAppUsers: async () => {

    },
    findAppUser: async (data) => {

        data;
        alert('find')
        //return await Http.post({ route: '/', data: {} })
    },
    deleteAppUser: async (data) => {

        data;
        alert('delete')
        //return await Http.post({ route: '/', data: {} })
    },
    updateAppUser: async (data) => {

        data;
        alert('update')

        //return await Http.post({ route: '/', data: {} })
    },

    listPqrs: async (data) => {

        return await Http.post({ route: '/admin/pqrslist', data: data })

        
    },
    Archived: async (data) => {

        return await Http.post({ route: '/admin/deletepqrs', data: data })
       
    },

    responsePqrs: async (data) => {

        return await Http.post({ route: '/admin/responsepqrs', data: data })
       
    }
    
}