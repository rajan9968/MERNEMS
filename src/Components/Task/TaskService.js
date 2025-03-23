import axios from "axios";

export const selectTask = async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/work/selectassignedwork', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        return response.data;


    } catch (error) {
        console.error("Error applying leave:", error);
        throw error;
    }
}