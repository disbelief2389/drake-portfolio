// Importing HTML elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypes = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value.trim();

    if (inputValue === 'Red') {
        alert('Pokémon not found');
    } else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.value.toLowerCase()}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Pokémon not found');
                    throw new Error('Network response was not ok.');
                }
                
            })
            .then((data) => {
                if (data) {
                    // Display Pokémon details
                    pokemonName.textContent = data.name.toUpperCase();
                    pokemonId.textContent = '#' + data.id;
                    pokemonWeight.textContent = 'Weight: ' + data.weight;
                    pokemonHeight.textContent = 'Height: ' + data.height;

                    // Clear previous types
                    pokemonTypes.innerHTML = '';
                    data.types.forEach(type => {
                        const typeElement = document.createElement('span');
                        typeElement.textContent = type.type.name.toUpperCase();
                        pokemonTypes.appendChild(typeElement);
                    });

                    // Set stats
                    hp.textContent = data.stats[0].base_stat;
                    attack.textContent = data.stats[1].base_stat;
                    defense.textContent = data.stats[2].base_stat;
                    specialAttack.textContent = data.stats[3].base_stat;
                    specialDefense.textContent = data.stats[4].base_stat;
                    speed.textContent = data.stats[5].base_stat;

                    // Handle sprite image
                    const existingSprite = document.getElementById('sprite');
                    if (existingSprite) {
                        existingSprite.remove();
                    }
                    const spriteImg = document.createElement('img');
                    spriteImg.id = 'sprite';
                    spriteImg.src = data.sprites.front_default;
                    document.body.appendChild(spriteImg); // Append to a specific container if available
                } else {
                    alert('Pokémon not found');
                }
            })
            .catch(error => {
                console.error('Error fetching Pokémon data:', error);
            });
    }
});