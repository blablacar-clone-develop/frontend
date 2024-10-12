import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

export const fetchUserData = async (navigate: NavigateFunction) => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_BASE_URL_API || "";

    if (token) {
        try {
            const response = await axios.get(`${API_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data === "token") {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                navigate("/login");
                return null;
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
    navigate("/login");
    return null;
};
