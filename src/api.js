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

// Logout user by sending refresh token
export const logoutUser = async (refreshToken) => {
    try {
        const response = await apiClient.post('/auth/logout/', { refresh: refreshToken });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ------------------------------
// Place APIs
// ------------------------------

// Get all places with detailed info
export const getPlaces = async () => {
    try {
        const response = await apiClient.get('/admin/places/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a new place
export const addPlace = async (placeData) => {
    try {
        const response = await apiClient.post('/admin/place/add/', placeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get details of a specific place
export const placeDetails = async (placeId) => {
    try {
        const response = await apiClient.get(`/admin/place/${placeId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Edit an existing place (partial update)
export const editPlace = async (placeId, placeData) => {
    try {
        const response = await apiClient.patch(`/admin/place/${placeId}/edit/`, placeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a place
export const deletePlace = async (placeId) => {
    try {
        const response = await apiClient.delete(`/admin/place/${placeId}/delete/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ------------------------------
// Category APIs
// ------------------------------

// Get all categories with associated places
export const getCategories = async () => {
    try {
        const response = await apiClient.get('/admin/categories/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a new category
export const addCategory = async (categoryData) => {
    try {
        const response = await apiClient.post('/admin/category/add/', categoryData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get details of a specific category with its places
export const categoryDetails = async (categoryId) => {
    try {
        const response = await apiClient.get(`/admin/category/${categoryId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Edit an existing category (partial update)
export const editCategory = async (categoryId, categoryData) => {
    try {
        const response = await apiClient.patch(`/admin/category/${categoryId}/edit/`, categoryData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
    try {
        const response = await apiClient.delete(`/admin/category/${categoryId}/delete/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ------------------------------
// Tag APIs
// ------------------------------

// Get all tags with associated places
export const getTags = async () => {
    try {
        const response = await apiClient.get('/admin/tags/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a new tag
export const addTag = async (tagData) => {
    try {
        const response = await apiClient.post('/admin/tag/add/', tagData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get details of a specific tag with its associated places
export const tagDetails = async (tagId) => {
    try {
        const response = await apiClient.get(`/admin/tag/${tagId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Edit an existing tag (partial update)
export const editTag = async (tagId, tagData) => {
    try {
        const response = await apiClient.patch(`/admin/tag/${tagId}/edit/`, tagData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a tag
export const deleteTag = async (tagId) => {
    try {
        const response = await apiClient.delete(`/admin/tag/${tagId}/delete/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ------------------------------
// PlaceImage APIs
// ------------------------------

// Get all images for a given place
export const getPlaceImages = async (placeId) => {
    try {
        const response = await apiClient.get(`/admin/place/${placeId}/images/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a new image for a place (multipart/form-data)
export const addPlaceImage = async (placeId, imageData) => {
    try {
        const response = await apiClient.post(`/admin/place/${placeId}/images/add/`, imageData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get details of a specific place image
export const placeImageDetails = async (imageId) => {
    try {
        const response = await apiClient.get(`/admin/images/${imageId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Edit an existing place image (partial update)
export const editPlaceImage = async (imageId, imageData) => {
    try {
        const response = await apiClient.patch(`/admin/images/${imageId}/edit/`, imageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a place image
export const deletePlaceImage = async (imageId) => {
    try {
        const response = await apiClient.delete(`/admin/images/${imageId}/delete/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ------------------------------
// PlaceSocialMedia APIs
// ------------------------------

// Get all social media records for a given place
export const getPlaceSocialMedias = async (placeId) => {
    try {
        const response = await apiClient.get(`/admin/places/${placeId}/social/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a new social media record for a place
export const addPlaceSocialMedia = async (placeId, socialData) => {
    try {
        const response = await apiClient.post(`/admin/places/${placeId}/social/add/`, socialData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get details of a specific social media record
export const placeSocialMediaDetails = async (socialId) => {
    try {
        const response = await apiClient.get(`/admin/social/${socialId}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Edit an existing social media record (partial update)
export const editPlaceSocialMedia = async (socialId, socialData) => {
    try {
        const response = await apiClient.patch(`/admin/social/${socialId}/edit/`, socialData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a social media record
export const deletePlaceSocialMedia = async (socialId) => {
    try {
        const response = await apiClient.delete(`/admin/social/${socialId}/delete/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default apiClient;