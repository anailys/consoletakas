import { Http } from '../AppServices'

export default {

    getPublications: async (data) => {
        console.log(data)
        return await Http.post({ route: '/admin/listpublicationsusersconsole', data: data })
    },
    getTopTakastings: async (data) => {
        console.log(data)
        return await Http.post({ route: '/admin/topmatch', data: data })
    },
    getMatchdetail: async (data) => {
        console.log(data)
        return await Http.post({ route: '/admin/matchdetail', data: data })
    },
    getSinglePublication: async (data) => {
        console.log(data)
        return await Http.post({ route: '/admin/detailproduct', data: data })
    },
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

    changeStatus: async (id, status) => {
        return await Http.post({
            route: '/admin/changestatuspublication', data: {
                "id_publication": id,
                "flap_status": status
            }
        })
    },
    update: async () => {


        //return await Http.post({ route: '/', data: {} })
    }

}