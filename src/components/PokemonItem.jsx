import React from 'react';
import styles from './PokemonItem.module.css';
import { ReactComponent as Logo } from '../assets/pokeball.svg';
import { Link } from 'react-router-dom';

const PokemonItem = ({ url }) => {
  const [pokemon, setPokemon] = React.useState({});

  const [loading, setLoading] = React.useState(false);

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

  React.useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setPokemon(json);
      setLoading(false);
    }
    fetchPokemon();
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <Logo />
        </div>
      ) : (
        <Link to={`./pokemon/${pokemon.id}`} className={styles.cardContainer}>
          {pokemon.name && (
            <>
              <div className={styles.nome}>
                <p>{pokemon.name}</p>
                <p>
                  {(pokemon.id >= 1000 && `#${pokemon.id}`) ||
                    (pokemon.id >= 100 && `#0${pokemon.id}`) ||
                    (pokemon.id >= 10 && `#00${pokemon.id}`) ||
                    (pokemon.id >= 1 && `#000${pokemon.id}`)}
                </p>
              </div>
              {pokemon.name && (
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                ></img>
              )}
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
            </>
          )}
        </Link>
      )}
    </>
  );
};

export default PokemonItem;
