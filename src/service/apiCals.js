import http from "../http-common";

class TableDataService {
    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        return http.get(`/table/${id}`);
    }

    create(data) {
        return http.post("/table", data);
    }
    delete(id) {
        return http.delete(`/table/${id}`);
    }
    update(id, data) {
        return http.patch(`/table/${id}`, data);
    }
    getAllUsers() {
        return http.get(`/users`)
    }
    signUp() {
        return http.post('/auth/register', data)
    }
}
export default new TableDataService();
