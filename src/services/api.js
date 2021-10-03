import axios from 'axios';

//Filmes em cartaz
//movie/now_playing?api_key=86557fef82b18fcace461c57d6186091&language=pt-BR&page=1

export const key = '86557fef82b18fcace461c57d6186091';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

export default api;