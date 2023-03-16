import axios from "axios";

//tạo 1 đối tượng client
//tạo config
const axiosClient = axios.create({
    // baseURL đường dẫn đến API
    baseURL: "http://localhost:8081",
    // headers là 1 OJ
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    paramsSerializer: params => params,
});

// const getAccessToken = () => {
//     let token = sessionStorage.getItem("_accessToken");
//     return token ? JSON.parse(token) : "";
// }

//cấu hình
axiosClient.interceptors.request.use(async (config) => {
    //cấu hình request khi call API
    // let token = getAccessToken();

    // if (!token) {
    //     config.headers.Authorization = `Bearer ${token.access_token}`;
    // }

    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data)
        return response
},
    (error) => {
        throw error;
    }
);

export default axiosClient
