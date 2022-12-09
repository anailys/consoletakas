import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {

    state: () => ({
        user: useStorage('auth', {
            user_id: '',
            token: '',
            isLogged: false,
            email: '',
            name: '',
        })
    }),
    actions: {

        storeLogin(loggedUser) {

            return new Promise((resolve, reject) => {

                this.user = {
                    user_id: loggedUser.user_id,
                    token: loggedUser.token,
                    isLogged: true,
                    email: loggedUser.email,
                    name: loggedUser.name
                }
                if (this.user.isLogged) resolve('stored')
                else reject('error')

            })
        },
        emptyLogin() {


            return new Promise((resolve, reject) => {

                this.user = {
                    user_id: '',
                    token: '',
                    isLogged: false,
                    email: '',
                    name: ''
                }
                if (!this.user.isLogged) resolve('logged out')
                else reject('error')

            })


        },
        async getAuth() {
            return new Promise((resolve) => {
                resolve(JSON.parse(useStorage('auth').loggedUservalue))
            })
        }
    }
});


