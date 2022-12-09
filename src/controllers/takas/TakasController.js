import TakasServices from "../../services/takas/TakasServices"


export default {

    async getTopTakastings(paginator, search, params) {
        console.log(params)
        let data = {
            "status": params.status ?? 1,
            "items": paginator.items_per_page,
            "column": "name",
            "value": search,
            "pag": paginator.current_page
        }
        let response = await TakasServices.getTopTakastings(data)
        return response.data.data.top_taksteos.takasteos
    },

    async getTopTakastingsForUser(user_id, paginator, search, params) {
        console.log(params)
        let data = {
            "status": params.status ?? 1,
            "user_id": user_id,
            "items": paginator.items_per_page,
            "column": "name",
            "value": search,
            "pag": paginator.current_page
        }
        return TakasServices.getTopTakastings(data)
    },
    async getMatchdetail(idoffer) {
        console.log(idoffer)
        let data = {
            "idoffer":idoffer
        }
        return TakasServices.getMatchdetail(data)
    },
    async getPublications(user_id, paginator, search, params) {
        console.log(params)
        let data = {
            "status": params.status ?? 1,
            "user_id": user_id,
            "items": paginator.items_per_page,
            "column": "name",
            "value": search,
            "pag": paginator.current_page
        }
        return TakasServices.getPublications(data)
    },
    async getSinglePublication(publication_id) {
        let data = {
            "IdProduct": publication_id
        }
        return TakasServices.getSinglePublication(data)
    },
    create: () => {
        TakasServices.create();

    },
    list: async (paginator, search) => {
        let data = {
            status: 1,
            column: 'fullname',
            value: search,
            items: paginator.items_per_page,
            pag: paginator.current_page

        }
        let response = await TakasServices.list(data);
        return response

    },
    find: () => {

        TakasServices.find();
    },
    changeStatus: async (publication) => {

        let status = !(publication.status == 1)
        return await TakasServices.changeStatus(publication.id, status);

    },
    update: () => {
        TakasServices.update();

    },

}