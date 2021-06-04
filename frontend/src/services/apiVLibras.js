import axios from 'axios';

const apiVLibras = axios.create({
    baseURL: 'https://www.gov.br/conecta/catalogo/apis/vlibras/swagger.json',
});

export default apiVLibras;