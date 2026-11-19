import { muralisApi } from "../http-common";

class UsersDataService {
    // async create(data) {
    //     return await muralisApi.post(
    //         '/users/', 
    //         data
    //     )
    // }

    async register(data) {
        return await muralisApi.post(
            '/auth/register',
            data
        )
    }

    async login(data) {
        return await muralisApi.post(
            '/auth/login',
            data)
    }

    async logout() {
        return await muralisApi.post(
            '/auth/logout',
            {}
        )
    }

    async currentUser() {
        return await muralisApi.get(
            '/auth/me'
        )
    }

    async updateUser(data){
        return await muralisApi.put(
            '/users/edit',
            data
        )
    }
}

export default new UsersDataService();