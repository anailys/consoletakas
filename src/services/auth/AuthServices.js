import { Http } from '../AppServices'
import { useAuthStore } from "../../store/auth/AuthStore"
//import axios from 'axios'

export default {

  users: {
    async createUser(user_id, user_rol) {
      let auth = await useAuthStore().getAuth()
      let http;
      try {

        let a = {
          route: '/admin/createcode?token=' + auth.token,
          data: {
            IdUserCreator: user_id,
            Privilegio: user_rol,
          },
        }
        console.log(a)
        http = Http.post(a)

      } catch (e) {
        console.log(e.response)
      }
      return http
    }
  },

  attemptLogin: async (accountIdentifier, password) => {
    return await Http.post({
      route: '/admin/loginadminuser',
      data: {
        userAdmin: accountIdentifier,
        PasswordAdmin: password
      }
    })
  },


}