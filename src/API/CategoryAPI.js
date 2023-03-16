import axiosClient from "../commons/axiosClient";

const url = "/category"
const CategoryAPI = {
    getAll: () => {
        return axiosClient.get(`${url}`);
    },
    getById: (id) => {
        return axiosClient.get(`${url}/${id}`);
    },
    delete: (id) => {
        // console.log(id);
        return axiosClient.delete(`${url}/${id}`);
    },
    create: (params) => {
        return axiosClient.post(url, params)
    },
    update: (params) => {
        return axiosClient.put(`${url}/${params.id}`, params)
    },
}

export default CategoryAPI

