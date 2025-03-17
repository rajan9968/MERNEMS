import axios from "axios";





export const applyLeave = async (LeaveData) => {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/leave/applyleave', LeaveData, {
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
};

// User Leave Select API

export const selectLeave = async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/leave/selectleave', {
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
};


