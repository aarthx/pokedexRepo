import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Pokemoninfo.module.css';
import { ReactComponent as Logo } from '../assets/pokeball.svg';
import { ReactComponent as Retorno } from '../assets/return.svg';
import { ReactComponent as Weight } from '../assets/weight.svg';
import { ReactComponent as Height } from '../assets/height.svg';

const PokemonInfo = () => {
  function corTipos(tipo) {
    switch (tipo) {
      case 'normal':
        return '#AAA67F';
      case 'fighting':
        return '#C12239';
      case 'flying':
        return '#A891EC';
      case 'ground':
        return '#DEC16B';
      case 'poison':
        return '#A43E9E';
      case 'rock':
        return '#B69E31';
      case 'bug':
        return '#A7B723';
      case 'ghost':
        return '#70559B';
      case 'steel':
        return '#B7B9D0';
      case 'fire':
        return '#F57D31';
      case 'water':
        return '#6493EB';
      case 'grass':
        return '#74CB48';
      case 'electric':
        return '#F9CF30';
      case 'psychic':
        return '#FB5584';
      case 'ice':
        return '#9AD6DF';
      case 'dragon':
        return '#7037FF';
      case 'dark':
        return '#75574C';
      case 'fairy':
        return '#E69EAC';
    }
  }

  const [pokemon, setPokemon] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const json = await response.json();
      setPokemon(json);
    }
    fetchPokemon();
  }, []);

  return (
    <section className={styles.infoContainer}>
      <div className={styles.logo}>
        <Logo />
      </div>
      {pokemon.types && (
        <div
          className={styles.pokemonBox}
          style={{ background: `${corTipos(pokemon.types[0].type.name)}` }}
        >
          <div className={styles.headerInfo}>
            <a href="../">
              <Retorno />
            </a>
            <h1>{pokemon.name}</h1>
            <p>
              {(pokemon.id >= 1000 && `#${pokemon.id}`) ||
                (pokemon.id >= 100 && `#0${pokemon.id}`) ||
                (pokemon.id >= 10 && `#00${pokemon.id}`) ||
                (pokemon.id >= 1 && `#000${pokemon.id}`)}
            </p>
            <Logo />
          </div>
          <div className={styles.pokemonImg}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt=""
            />
          </div>
          <div
            className={styles.infos}
            style={{ color: `${corTipos(pokemon.types[0].type.name)}` }}
          >
            <div className={styles.tipos}>
              {pokemon.types &&
                pokemon.types.map((tipo) => (
                  <p
                    key={tipo.type.name}
                    style={{ backgroundColor: corTipos(tipo.type.name) }}
                  >
                    {tipo.type.name}
                  </p>
                ))}
            </div>
            <h1>About</h1>
            <ul className={styles.infoAbout}>
              <li>
                <p>Weight</p>
                <Weight />
                <p>{pokemon.weight / 10} kg</p>
              </li>
              <li>
                <p>Height</p>
                <Height />
                <p>{pokemon.height / 10} m</p>
              </li>
              <li>
                <span>{pokemon.abilities[0].ability.name}</span>
                <span>
                  {pokemon.abilities[1] && pokemon.abilities[1].ability.name}
                </span>
              </li>
            </ul>
            <h1>Base Stats</h1>
            <div className={styles.infoStats}>
              <ul>
                <li>
                  <p>HP</p>
                  <meter
                    min="0"
                    max="255"
                    value={pokemon.stats[0].base_stat}
                  ></meter>
                </li>
                <li>
                  <p>ATK</p>
                  <meter
                    min="0"
                    max="255"
                    value={pokemon.stats[1].base_stat}
                  ></meter>
                </li>
                <li>
                  <p>DEF</p>
                  <meter
                    min="0"
                    max="255"
                    value={pokemon.stats[2].base_stat}
                  ></meter>
                </li>
                <li>
                  <p>SATK</p>
                  <meter
                    min="0"
                    max="255"
                    value={pokemon.stats[3].base_stat}
                  ></meter>
                </li>
                <li>
                  <p>SDEF</p>
                  <meter
                    min="0"
                    max="255"
                    value={pokemon.stats[3].base_stat}
                  ></meter>
                </li>
                <li>
                  <p>SPD</p>
                  <meter
                    min="0"
                    max="255"
                    value={pokemon.stats[4].base_stat}
                  ></meter>
                </li>
                <li>
                  <p></p>
                  <div></div>
                </li>
              </ul>
            </div>
          </div>
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
    </section>
  );
};

export default PokemonInfo;
