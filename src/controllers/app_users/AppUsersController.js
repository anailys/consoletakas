import AppUsersServices from "../../services/app_users/AppUsersServices"


export default {
    setUserInfo(app_user) {
        let register_date
        if (app_user.datecreated) {
            let _register_date = app_user.datecreated.split('T')
            register_date = _register_date[0]
        } else {
            register_date = 'No aplica'
        }
        return {
            id: app_user.idnumbre,
            name: app_user.fullname,
            register_date: register_date,
            location: 'N/A',
            email: app_user.email,
            profile_picture: app_user.imgurl,
            phone: app_user.phonenumber
        }
    },
    create: () => {
        AppUsersServices.create();
    },
    list: async (paginator, search) => {
        let data = {
            status: 1,
            column: 'fullname',
            value: search,
            items: paginator.items_per_page,
            pag: paginator.current_page

        }
        let response = await AppUsersServices.list(data);
        return response

    },
    find: () => {

        AppUsersServices.find();
    },
    delete: () => {
        AppUsersServices.delete();

    },
    update: () => {
        AppUsersServices.update();

    },

}