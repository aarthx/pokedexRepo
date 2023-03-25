import React, { useRef } from 'react';
import { ReactComponent as Logo } from './assets/pokeball.svg';
import styles from './Home.module.css';
import PokemonItem from './components/PokemonItem';

const Home = () => {
  const [pokemonsURL, setPokemonsURL] = React.useState([]);
  const [busca, setBusca] = React.useState('');
  const [buscados, setBuscados] = React.useState([]);
  const [buscando, setBuscando] = React.useState(false);
  const [totalPokes, setTotalPokes] = React.useState(25);
  const pokeBox = useRef();
  const pokeList = useRef();

  function debounce(func, timeout = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function limparLista() {
    setPokemonsURL([]);
  }

  function verificaScroll() {
    if (
      pokeBox.current.scrollTop >= 0.75 * pokeList.current.clientHeight &&
      !buscando
    ) {
      console.log('ocorreu');
      adicionaPokemons();
    }
  }

  function adicionaPokemons() {
    if (totalPokes < 950) {
      setTotalPokes((totalPokes) => totalPokes + 25);
    } else if (totalPokes <= 1010) {
      setTotalPokes((totalPokes) => totalPokes + 10);
    }
  }

  React.useEffect(() => {
    if (totalPokes < 950 && totalPokes !== buscados.length) {
      for (let i = totalPokes - 24; i < totalPokes + 1; i++) {
        setPokemonsURL((links) => [
          ...links,
          `https://pokeapi.co/api/v2/pokemon/${i}/`,
        ]);
      }
    } else if (totalPokes <= 1010 && totalPokes !== buscados.length) {
      for (let i = totalPokes - 9; i < totalPokes + 1; i++) {
        setPokemonsURL((links) => [
          ...links,
          `https://pokeapi.co/api/v2/pokemon/${i}/`,
        ]);
      }
    }
  }, [totalPokes]);

  async function buscaPokes() {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon/?limit=1010',
    );
    const json = await response.json();
    const listaBuscada = json.results
      .filter((poke) => {
        return poke.name.includes(busca);
      })
      .map((item) => item.url);
    setBuscados([...listaBuscada]);
  }

  React.useEffect(() => {
    if (busca.length > 2) {
      buscaPokes();
      setTotalPokes(buscados.length);
      setBuscando(true);
    } else {
      if (totalPokes !== 25) {
        setBuscando(false);
        limparLista();
        setTotalPokes(25);
      }
    }
  }, [busca]);

  React.useEffect(() => {
    if (busca.length > 2) {
      setPokemonsURL([...buscados]);
    }
  }, [buscados]);

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
      <div
        className={styles.pokemonBox}
        ref={pokeBox}
        onScroll={debounce(() => verificaScroll())}
      >
        <ul className={styles.pokemonList} ref={pokeList}>
          {pokemonsURL &&
            pokemonsURL.map((url) => <PokemonItem key={url} url={url} />)}
        </ul>
      </div>
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
