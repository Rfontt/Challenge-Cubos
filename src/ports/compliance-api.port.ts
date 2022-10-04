import axios from "axios";

const url = axios.create({
    baseURL: 'https://compliance-api.cubos.io/cpf/validate'
});

export default url;