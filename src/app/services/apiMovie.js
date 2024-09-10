const { default: axios } = require("axios");

// Verifique se o token de API está sendo carregado corretamente
// if (!process.env.API_KEY) {
//     console.error("API_KEY não definida no arquivo .env");
// }

const apiMovie = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        language: 'pt-BR'  // Define o idioma como português do Brasil
    },
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,  // Usa template literals para a chave de API
    }
});

export default apiMovie;