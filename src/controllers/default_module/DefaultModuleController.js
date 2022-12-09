import DefaultModuleServices from "../../services/default_module/DefaultModuleServices"


export default {

    create: () => {
        DefaultModuleServices.create();

    },

    list: () => {
        DefaultModuleServices.list();

    },
    find: () => {
        DefaultModuleServices.find();

    },
    delete: () => {
        DefaultModuleServices.delete();

    },
    update: () => {
        DefaultModuleServices.update();

    },


}