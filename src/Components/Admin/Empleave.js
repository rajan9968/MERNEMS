import axios from "axios";

// Emplyee Leave Select API 

export const empLeave = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/admin/empleave');
    if (response.data) {

        try {
            return response.data;
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
    return null;

};