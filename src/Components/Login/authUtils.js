import { jwtDecode } from "jwt-decode";

export const getUserDetails = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            return jwtDecode(token);  // Returns decoded user data
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
    return null;
};
