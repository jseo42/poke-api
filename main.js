import getSinnohData from './src/scripts/pokedata';

let currentPokemon = 0;
let pokemonList = [];


const nameElement = document.querySelector('#pokemon_name');
const idElement = document.querySelector('#pokemon_id');
const typeElement = document.querySelector('#pokemon_type');
const imageElement = document.querySelector('#pokemon_img');
const backButton = document.querySelector('#back_btn');
const nextButton = document.querySelector('#next_btn');
const searchPokemon = document.querySelector('#pokemon_search');


backButton.addEventListener('click', () => changePokemon(-1));
nextButton.addEventListener('click', () => changePokemon(1));
imageElement.addEventListener('click', toggleShiny);
searchPokemon.addEventListener('input', () => {
  const searchName = searchPokemon.value.toLowerCase();
  const findPokemonIndex = pokemonIndex(searchName);
  if (findPokemonIndex !== -1) {
    currentPokemon = findPokemonIndex;
    renderPokemon(currentPokemon);
  } else {
    console.log('Error, cannot find:', searchName);
  }
});

function renderPokemon(index) {
  const pokemon = pokemonList[index];
  if (pokemon) {
    const { name, id, image, pokemonType } = pokemon;
    nameElement.textContent = capitalizeFirst(name);
    idElement.textContent = id;
    typeElement.className = '';
    while (typeElement.firstChild) {
      typeElement.removeChild(typeElement.firstChild);
    }
    const types = pokemonType;
    for (let type of types) {
      const typeSpan = document.createElement('span');
      const typeClass = type;
      typeSpan.textContent = type.toUpperCase();
      typeSpan.classList.add(typeClass);
      typeElement.appendChild(typeSpan);
    };
    imageElement.src = image;
  }
}
function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function changePokemon(direction) {
  currentPokemon = (currentPokemon + direction + pokemonList.length) % pokemonList.length;
  renderPokemon(currentPokemon);
}
function pokemonIndex(searchName) {
  for (let i = 0; i < pokemonList.length; i++) {
    const pokemon = pokemonList[i];
    if (pokemon.name === searchName) {
      return i;
    }
  }
  return -1;
}

function toggleShiny() {
  const pokemon = pokemonList[currentPokemon];
  if (pokemon) {
    imageElement.src = (imageElement.src === pokemon.image) ? pokemon.imageShiny : pokemon.image;
  }
}

getSinnohData().then((data) => {
  pokemonList = data;
  console.log(pokemonList);
  renderPokemon(currentPokemon);
});
