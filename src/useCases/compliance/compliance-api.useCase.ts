import axios from "axios";

const compliceApi = axios.create({
    baseURL: 'https://compliance-api.cubos.io'
});

export default compliceApi;