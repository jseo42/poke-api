import getSinnohData from './pokedata';

let currentPokemon = 0;
let pokemonList = [];


const nameElement = document.querySelector('#pokemon_name');
const idElement = document.querySelector('#pokemon_id');
const typeElement = document.querySelector('#pokemon_type');
const imageElement = document.querySelector('#pokemon_img');
const backButton = document.querySelector('#back_btn');
const nextButton = document.querySelector('#next_btn');


backButton.addEventListener('click', () => changePokemon(-1));
nextButton.addEventListener('click', () => changePokemon(1));
imageElement.addEventListener('click', toggleShiny);


function renderPokemon(index) {
  const pokemon = pokemonList[index];
  if (pokemon) {
    const { name, id, image, pokemonType } = pokemon;
    nameElement.textContent = capitalizeFirst(name);
    idElement.textContent = id;
    typeElement.textContent = pokemonType.toUpperCase();
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

function toggleShiny() {
  const pokemon = pokemonList[currentPokemon];
  if (pokemon) {
    imageElement.src = (imageElement.src === pokemon.image) ? pokemon.imageShiny : pokemon.image;
  }
}

getSinnohData().then((data) => {
  pokemonList = data;
  renderPokemon(currentPokemon);
});
