const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
const userSearch = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonTypes = document.getElementById("types");
const pokemonImage = document.getElementById("pokemon-image");


const fetchData = async () => {
  try{
    const res = await fetch(pokemonAPI);
    const data = await res.json();
    pokemonSearch(data.results);
  }
  catch (err) {
    console.log(err);
  }
}
const cleanUp = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHeight.textContent = "";
  pokemonHp.textContent = "";
  pokemonAttack.textContent = "";
  pokemonDefense.textContent = "";
  pokemonSpecialAttack.textContent = "";
  pokemonSpecialDefense.textContent = "";
  pokemonSpeed.textContent = "";
  pokemonTypes.innerHTML = "";
  pokemonImage.innerHTML = "";
}
const displayNIWHI = (name, id, weight, height, sprites) => {
  pokemonImage.innerHTML =  `<img id="sprite" src=${sprites.front_default}>`
  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = id;
  pokemonWeight.textContent = weight;
  pokemonHeight.textContent = height;
}
const displayTypes = types => {
  pokemonTypes.innerHTML = "";
  for (const type of types){
    const typeName = type.type.name;
    pokemonTypes.innerHTML += `<div class="type ${typeName}">${typeName.toUpperCase()}</div>`
  }
}
const displayStats = stats => {
  for (const stat of stats){
    document.getElementById(stat.stat.name).textContent = stat.base_stat;
  }
}
const displayPokemon = async (pokemon) => {
  try{
    const res = await fetch(pokemon.url);
    const data = await res.json();
    const{height, id, name, sprites, stats, types, weight} = data;
    displayNIWHI(name,id,weight,height,sprites);
    displayTypes(types);
    displayStats(stats);
  }
  catch(err){
    console.log(err);
  }
}
const pokemonSearch = (pokemons) => {
  const search = userSearch.value;
  let index = -1;
  if(Number(search)){
    index = pokemons.findIndex((pokemon) => pokemon.id === Number(search));
  }
  else{
    index = pokemons.findIndex((pokemon) => pokemon.name === search.toLowerCase());
  }
  if(index === -1){
    alert("Pokémon not found");
    cleanUp();
    return;
  }
  displayPokemon(pokemons[index]);
}

searchBtn.addEventListener("click", () => {
  fetchData();
});
searchBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});