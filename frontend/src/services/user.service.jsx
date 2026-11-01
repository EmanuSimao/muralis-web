import { muralisApi } from "../http-common";

class UsersDataService {
    create(data) {
        return muralisApi.post('/users/register', data)
    }

    // findOne(){
    //     return muralisApi.get('/users/:id')
    // }
}

export default new UsersDataService();