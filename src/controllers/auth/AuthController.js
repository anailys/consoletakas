import AuthServices from "../../services/auth/AuthServices";
import { useAuthStore } from "../../store/auth/AuthStore"
//import jwt_decode from "jwt-decode"

export default {
 
  async createUserAdmin(modal_form_data) {
    return await AuthServices.createUserAdmin(modal_form_data);   

  },
  validateCredentials: (credentials) => {

    return credentials.username != '' && credentials.password != ''
  },
  login: async (credentials) => {

    try {

      let response = await AuthServices.attemptLogin(credentials.username, credentials.password)

      //return response;
      let store = useAuthStore();

      await store.storeLogin({
        user_id: response.data.idUser,
        email: '',
        name: credentials.username,
        token: response.data.token,

      })
      return response
    } catch (e) {

      return e.response

    }


  },
  logout: async () => {
    let store = useAuthStore();

    await store.emptyLogin()
  }

}