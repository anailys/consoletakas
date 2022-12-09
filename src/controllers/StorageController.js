import { useStorage } from "@vueuse/core";

export default {
    async useStorage(name, data) {
        return new Promise((resolve) => {
            resolve(JSON.parse(useStorage(name, data).value))
        })
    }
}