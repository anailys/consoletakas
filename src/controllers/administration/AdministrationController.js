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
    listPqrs: async (status, paginator) => {
        let data = {
            "status": status,
            "items": paginator.items_per_page,
            "pag":paginator.current_page
        }
        return await AdministrationServices.listPqrs(data);

    },

    Archived: async (idPQRs) => {
        let data = {
            "idPQRs": idPQRs,            
        }
        return await AdministrationServices.Archived(data);

    },

    responsePqrs: async (response_data) => {
        let data = {
            "idPQRs" : response_data.idPQRs,
            "idfirebaseUser" : response_data.idfirebaseUser,
            "detailsPQRs" : response_data.detailsPQRs,
            "flagPQRs" :response_data.flagPQRs          
        }
        return await AdministrationServices.responsePqrs(data);

    },
}