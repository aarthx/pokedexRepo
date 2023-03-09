import React from 'react';
import { ReactComponent as Logo } from './assets/pokeball.svg';
import styles from './Home.module.css';
import PokemonItem from './components/PokemonItem';

const Home = () => {
  const [pokemonsURL, setPokemonsURL] = React.useState([]);
  const [busca, setBusca] = React.useState('');
  const [lista, setLista] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchPokemons() {
      setLoading(true);
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=1008',
      );
      const json = await response.json();
      setLista([...json.results]);
      setLoading(false);
    }
    fetchPokemons();
  }, []);

  React.useEffect(() => {
    const listaBuscada = lista.filter((item) => item.name.includes(busca));
    const listaURL = listaBuscada.map((item) => item.url);
    setPokemonsURL([...listaURL]);
  }, [busca, lista]);

  return (
    <div className={styles.conteudo}>
      <div className={styles.logo}>
        <Logo />
        <h1 className={styles.titulo}>Pokédex</h1>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Digite o nome do pokemom"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      {loading ? (
        <div className={styles.loading}>
          <Logo />
        </div>
      ) : (
        <div className={styles.pokemonBox}>
          <ul className={styles.pokemonList}>
            {pokemonsURL &&
              pokemonsURL.map((url) => <PokemonItem key={url} url={url} />)}
          </ul>
        </div>
      )}

      <div className={styles.detalhes}>
        <div className={styles.blueBall}></div>
        <ul className={styles.balls}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
