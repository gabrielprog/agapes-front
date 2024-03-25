import api from "./api";

async function checkToken() {
    const token = localStorage.getItem("token");
    
    if (token) {

        const data = {
            token
        };
      
        try {
            const response = await api.post("/user/validate-jwt", data);
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return false;
}

const isAuthenticated = () => {
    return checkToken();
};

export default isAuthenticated;