import CategoriesServices from "../../services/categories/CategoriesServices"


export default {

    create: async (form_data) => {

        let post_data = {
            name: form_data.name,
            TypeP: 1,
            icon: 'https://n9.cl/c1z78',
        }

        return await CategoriesServices.create(post_data);



    },

    list: async () => {
        let data = {
            TypeP: 1,
            StatusP: 35
        }
        return await CategoriesServices.list(data);

    },
    findBy: () => {
        CategoriesServices.findBy();

    },
    delete: async (id) => {
        let data = {
            idC: id
        }
        return await CategoriesServices.delete(data);

    },
    update: async (form_data) => {

        let post_data = {
            idC: form_data.id,
            nameC: form_data.name,
            typePC: 1,
            iconC: 'https://n9.cl/c1z78',

        }

        return await CategoriesServices.update(post_data);

    },


}