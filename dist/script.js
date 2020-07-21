var pokemonId = 25;

window.addEventListener('DOMContentLoaded', (event) => {
	document.getElementById("pokemon-number").addEventListener("keyup", (e) =>{
    event.preventDefault();
		
		if (e.keyCode === 13) {
			searchPokemon(e.target.value)
		}
	});
	
	searchPokemon(pokemonId)
	
	document.getElementById("nav-button-left").addEventListener("click", (_) => {
		if(pokemonId != 1) {
			pokemonId--;
			searchPokemon(pokemonId);
		}
	})
	document.getElementById("nav-button-right").addEventListener("click", (_) => {
		if(pokemonId != 807) {
			pokemonId++;
			searchPokemon(pokemonId);
		}
	})
});

function setupUi() {
	
}

async function searchPokemon(id) {
	console.log(id)
	let pokemon = await getPokemonData(id);
	console.log(pokemon)
	document.getElementById('pokemon-image').setAttribute("src", pokemon.sprites.front_default);
	document.getElementById('pokemon-name').innerHTML = pokemon.name;
	document.getElementById('pokemon-type').innerHTML = `Type ${pokemon.types[0].type.name}` //TODO Fix
	document.getElementById('pokemon-height').innerHTML = `Height ${(pokemon.height*0.1).toFixed(1)}m`
	document.getElementById('pokemon-weight').innerHTML = `Weight ${(pokemon.weight*0.1).toFixed(1)}kg`
	
	
	document.getElementById('pokemon-number').value = id;
}

async function getPokemonData(id) {
	let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	if (response.ok) {
		return await response.json();
	} else {
		return null;
	}
}