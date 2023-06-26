import axios from 'axios';

export const createFolder = async (formData) => {
    try {
        const response = await axios.post('http://nas/create-folder.php', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadFile = async (formData) => {
    try {
        const response = await axios.post('http://nas/upload-file.php', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
