import { Http } from '../AppServices'

//import axios from 'axios'

export default {

  
  async createUserAdmin(data) {
    return await Http.post({ route: '/admin/newadminuser', data: data })
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