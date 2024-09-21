import createApiClient from "./api";

class UserService {
    constructor(baseURL = `/users`) {
        this.api = createApiClient(baseURL);
    }
    async getUsersList() {
        return (await this.api.get("/")).data;
    }
    async getUsersTopRank() {
        return (await this.api.get("/rank")).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async changeInfo(id, data) {
        return (await this.api.put(`/changeinfo/${id}`, data)).data;
    }
    async updateTotalPoint(data) {
        return (await this.api.put(`/totalpoint`, data)).data;
    }
}

export default new UserService();
