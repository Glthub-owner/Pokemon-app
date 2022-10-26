import React from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";
import "./styles/style.css";

export default function App() {
  const [allPokemons, setAllPokemons] = React.useState([]);
  const [loadMore, setLoadMore] = React.useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
    await console.log(allPokemons);
  };
  React.useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="App-container">
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              key={index}
              id={pokemon.id}
              image={pokemon.sprites.other.dream_world.front_default}
              name={pokemon.name}
              type={pokemon.types[0].type.name}
            />
          ))}
        </div>
      </div>
      <button className="load-more" onClick={() => getAllPokemons()}>
        Load More
      </button>
    </div>
  );
}
