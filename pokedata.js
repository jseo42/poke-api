async function getSinnoh() {
  const nameList = [];
  const sinnohURL = 'https://pokeapi.co/api/v2/pokedex/5/'
  try {
    const response = await fetch(sinnohURL, {mode: "cors"});
    const data = await response.json();
    data.pokemon_entries.forEach(entry => {
      nameList.push(entry.pokemon_species.name)
    });
  } catch (e) {
    console.log('Something went wrong');
    console.log(e);
  }
  return nameList;
}

async function getPokemonData(name) {
  const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const response = await fetch(pokemonURL, {mode:"cors"});
    const pokemonData = await response.json();
    const usableData = {
      name: pokemonData.name,
      id: pokemonData.id,
      image: pokemonData.sprites['front_default'],
      imageShiny: pokemonData.sprites['front_shiny'],
      pokemonType: pokemonData.types.map((type) => type.type.name)
    };
    return usableData
  } catch (e) {
    console.log('Something went wrong', e.message);
    throw(e);
  }
  
}

export async function getSinnohData() {
  const pokemonList = await getSinnoh();
  const pokemonData = [];
  for (const pokemon of pokemonList) {
    try {
      let details = await getPokemonData(pokemon);
      pokemonData.push(details);
    } catch (e) {
      console.log(e);
    }
  }
  console.log(pokemonData);
  return pokemonData;
}

export default getSinnohData; 