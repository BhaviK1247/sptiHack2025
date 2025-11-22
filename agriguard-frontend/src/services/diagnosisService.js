import api from './api';

export const uploadImage = async (formData) => {
    const response = await api.post('/diagnosis/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getDiagnosisHistory = async () => {
    const response = await api.get('/diagnosis/history/');
    return response.data;
};
