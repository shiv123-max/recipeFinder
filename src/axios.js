import axios from "axios";

const instance = axios.create({
    baseURL : "https://api.spoonacular.com"
})

export default instance;
