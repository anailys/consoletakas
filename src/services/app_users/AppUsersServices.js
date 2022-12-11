import { Http } from '../AppServices'

export default {

    createCode: async (data) => {
        let response = await Http.post({
            route: '/admin/createcode?access_token=' +  data.token,
            data: data
        })
        alert("El codigo para la creacion de nuevo usuario es : " +  response.data.code)
        
    },
    list: async (data) => {

        let response = await Http.post({
            route: '/admin/listusersconsole', data: data
        })
        return response
    },
    listUsersAdmins: async (data) => {

        let response = await Http.post({
            route: '/admin/usersadminlist', data: data
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