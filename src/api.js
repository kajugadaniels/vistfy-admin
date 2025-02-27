import axios from 'axios';

const baseURL =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_API_BASE_URL_PROD
        : import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL,
});

// Request interceptor to attach JWT Bearer token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle unauthorized access
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Please log in again.');
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// ------------------------------
// Account APIs
// ------------------------------

// Login user with email and password
export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login/', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

