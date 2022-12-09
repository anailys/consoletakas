import axios from 'axios'

const API_URL = process.env.NODE_ENV == 'production' ? process.env.VUE_APP_API_URL : 'http://localhost:1111'

export const AppServices = {

    add: async (params) => {
        return await axios.post(
            process.env.NODE_ENV == 'production' ? process.env.VUE_APP_API_URL : 'http://localhost:1111' + params.route,
            params.data,
            { headers: params.headers }
        )
    },
    find: async (params) => {
        return await axios.get(
            process.env.NODE_ENV == 'production' ? process.env.VUE_APP_API_URL : 'http://localhost:1111' + params.route + '/' + params.id,
            {},
            { headers: params.headers }
        )
    },
    update: async (params) => {
        return await axios.put(
            process.env.NODE_ENV == 'production' ? process.env.VUE_APP_API_URL : 'http://localhost:1111' + '/' + params.route + '/' + params.id,
            params.data,
            { headers: params.headers }
        )
    },
    delete: async (params) => {
        return await axios.delete(
            process.env.NODE_ENV == 'production' ? process.env.VUE_APP_API_URL : 'http://localhost:1111' + params.route + '/' + params.id,
            params.data,
            { headers: params.headers }
        )
    },
    list: async (params) => {
        return await axios.get(
            process.env.NODE_ENV == 'production' ? process.env.VUE_APP_API_URL : 'http://localhost:1111' + params.route + '/page',
            params.data,
            { headers: params.headers }
        )
    },
    search: async (params) => {
        return await axios.get(
            process.env.NODE_ENV == 'production' ? process.env.VUE_APP_API_URL : 'http://localhost:1111' + params.route + '/search',
            params.data,
            { headers: params.headers }
        )
    },
}

export const Http = {

    post: async (params) => {
        try {

            return await axios.post(
                API_URL + params.route,
                params.data,
                { headers: { "Content-Type": "application/json", ...params.headers } }
            )
        } catch (e) {
            console.log({
                'url': API_URL + params.route,
                data: params.data,
                config: { headers: { "Content-Type": "application/json", ...params.headers } }
            })
            return e.response
        }
    },
    get: async (params) => {
        try {

            return await axios.get(
                API_URL + params.route,
                { headers: params.headers }
            )
        } catch (e) {
            return e.response
        }
    },
    put: async (params) => {
        try {

            return await axios.put(
                API_URL + params.route,
                params.data,
                { headers: params.headers }
            )
        } catch (e) {
            return e.response
        }
    },
    delete: async (params) => {
        try {

            return await axios.delete(
                API_URL + params.route,
                params.headers
            )
        } catch (e) {
            return e.response
        }
    }
}