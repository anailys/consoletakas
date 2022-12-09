import AdministrationServices from "../../services/administration/AdministrationServices"



export default {

    createAppUser: () => {
        AdministrationServices.createAppUser();
    },

    findAppUser: (id) => {
        AdministrationServices.findAppUser(id);
    },
    deleteAppUser: () => {
        AdministrationServices.deleteAppUser();
    },
    updateAppUser: () => {
        AdministrationServices.updateAppUser();
    },


}