import axios from 'axios'

const cloudName = 'dqghhpqkz'
const uploadPreset = 'kvfddmfl'
const axiosUploadImage = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
})

export const uploadImage = async (file) => {

    if (!file) {
        return null;
    }

    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    const result = await axiosUploadImage.post('/', formData);

    return result.data.url;
}