import CategoriesServices from "../../services/categories/CategoriesServices"


export default {

    create: async (form_data) => {

        let post_data = {
            name: form_data.name,
            TypeP: 1,
            icon: form_data.icon,
        }

        return await CategoriesServices.create(post_data);



    },

    list: async (status, paginator, searcher) => {
        let data = {
            "status": status,
            "items": paginator.items_per_page,
            "column": "namec",
            "value"  : searcher,
            "pag":paginator.current_page
        }
        return await CategoriesServices.list(data);

    },

    listCategoryUsed: async (paginator) => {
        let data = {           
            "items": paginator.items_per_page,
            "pag":paginator.current_page
        }
        return await CategoriesServices.listCategoryUsed(data);

    },

    listCategoryInterested: async (paginator) => {
        let data = {           
            "items": paginator.items_per_page,
            "pag":paginator.current_page
        }
        return await CategoriesServices.listCategoryInterested(data);

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
            iconC: form_data.icon,

        }

        return await CategoriesServices.update(post_data);

    },


}