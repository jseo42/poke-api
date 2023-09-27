export default async function getSinnohData() {
  const sinnohURL = 'https://pokeapi.co/api/v2/pokedex/5/';
  try {
    const response = await fetch(sinnohURL, { mode: 'cors' });
    const data = await response.json();
    const pokemonList = data.pokemon_entries.map((entry) => entry.pokemon_species.name);
    
    const pokemonDataPromises = pokemonList.map(async (pokemon) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { mode: 'cors' });
        const pokemonData = await response.json();
        return {
          name: pokemonData.name,
          id: pokemonData.id,
          image: pokemonData.sprites['front_default'],
          imageShiny: pokemonData.sprites['front_shiny'],
          pokemonType: pokemonData.types.map((type) => type.type.name).join(' '),
        };
      } catch (e) {
        console.error('Error fetching data for', pokemon, e);
        return null;
      }
    });
    
    const pokemonData = await Promise.all(pokemonDataPromises);
    return pokemonData.filter(Boolean);
  } catch (e) {
    console.error('Something went wrong', e);
    throw e;
  }
  
}

