// script.js
const totalPokemon = 151;
let usedIndices = [];
let currentPokemonIndex = 0;
let currentPokemonName = '';

document.addEventListener('DOMContentLoaded', () => {
    loadPokemon();

    document.getElementById('submit-button').addEventListener('click', () => {
        const userAnswer = document.getElementById('pokemon-input').value.toLowerCase();
        checkAnswer(userAnswer);
    });
});

function getRandomPokemonIndex() {
    let index;
    do {
        index = Math.floor(Math.random() * totalPokemon) + 1;
    } while (usedIndices.includes(index));
    usedIndices.push(index);
    return index;
}

async function loadPokemon() {
    currentPokemonIndex = getRandomPokemonIndex();

    
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemonIndex}`);
        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const frenchNameEntry = speciesData.names.find(name => name.language.name === 'fr');
        currentPokemonName = frenchNameEntry.name.toLowerCase();

        document.getElementById('pokemon-image').src = data.sprites.front_default;
        document.getElementById('pokemon-input').value = '';
        document.getElementById('result').textContent = '';
    
}

function checkAnswer(userAnswer) {
    if (userAnswer === currentPokemonName) {
        document.getElementById('result').textContent = 'Correct !';
        setTimeout(loadPokemon, 1000);
    } else {
        document.getElementById('result').textContent = 'Faux, essayez encore.';
    }
}
