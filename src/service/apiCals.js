import http from "../http-common";

class TableDataService {
    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        return http.get(`/table/${id}`);
    }

    create(data) {
        return http.post("/tables", data);
    }
    delete(id) {
        return http.delete(`/table/${id}`);
    }
    update(id, data) {
        return http.patch(`/table/${id}`, data);
    }
}
export default new TableDataService();