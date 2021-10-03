//Listas de filmes com tamanho fixo
export function getListMovies(size, movies) {
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i]);
  }
  return popularMovies;
}

//Gerar número aleatório com base no tamanho da lista de filmes
export function getRandomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}
