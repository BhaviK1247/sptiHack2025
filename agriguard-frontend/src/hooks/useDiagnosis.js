import { useState } from 'react';

const useDiagnosis = () => {
    const [diagnosis, setDiagnosis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const diagnoseImage = async (image) => {
        setLoading(true);
        try {
            // Call diagnosis service here
            setDiagnosis({ result: 'Healthy' }); // Mock result
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { diagnosis, loading, error, diagnoseImage };
};

export default useDiagnosis;
