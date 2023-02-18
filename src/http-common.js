import axios from "axios";

export default axios.create({
    baseURL: "https://server-table-app.onrender.com/",
    headers: {
        "Content-type": "application/json"
    }
});