const totalCharacters = 50;
const selectedIndexes = [];

while (selectedIndexes.length < 30) {
    const randomIndex = Math.floor(Math.random() * totalCharacters) + 1;
    if (!selectedIndexes.includes(randomIndex)) {
        selectedIndexes.push(randomIndex);
    }
}

const characters = selectedIndexes.map((index, i) => ({
    name: `Personagem ${i + 1}`,
    image: `src/images/personagens/personagem-${index}.png`
}));

let currentCharacterIndex = 0;
let choices = { casa: [], beija: [], mata: [] };
let clicksLeft = { casa: 10, beija: 10, mata: 10 };

const characterImg = document.getElementById('character-img');
const progressBar = document.getElementById('progress-bar');
const counter = document.getElementById('counter');
const resultsSection = document.getElementById('results');
const casaCount = document.getElementById('casa-count');
const beijaCount = document.getElementById('beija-count');
const mataCount = document.getElementById('mata-count');
const characterGrid = document.getElementById('character-grid');
const restartBtn = document.getElementById('restart-btn');
const casaClicks = document.getElementById('casa-clicks');
const beijaClicks = document.getElementById('beija-clicks');
const mataClicks = document.getElementById('mata-clicks');

function initGame() {
    showCharacter(0);
    updateClicksDisplay();
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', handleChoice);
    });
    restartBtn.addEventListener('click', restartGame);
}

function showCharacter(index) {
    const character = characters[index];
    characterImg.src = character.image;
    characterImg.alt = character.name;
    counter.textContent = `Personagem ${index + 1} de ${characters.length}`;
    progressBar.style.width = `${(index / characters.length) * 100}%`;
}

function updateClicksDisplay() {
    casaClicks.textContent = `Casar: ${clicksLeft.casa} restantes`;
    beijaClicks.textContent = `Beijar: ${clicksLeft.beija} restantes`;
    mataClicks.textContent = `Matar: ${clicksLeft.mata} restantes`;
    
    document.querySelector('.action-btn[data-action="casa"]').disabled = clicksLeft.casa === 0;
    document.querySelector('.action-btn[data-action="beija"]').disabled = clicksLeft.beija === 0;
    document.querySelector('.action-btn[data-action="mata"]').disabled = clicksLeft.mata === 0;
}

function handleChoice(e) {
    const action = e.target.getAttribute('data-action');
    
    if (clicksLeft[action] <= 0) return;
    
    const currentCharacter = characters[currentCharacterIndex];
    choices[action].push(currentCharacter);
    clicksLeft[action]--;
    
    currentCharacterIndex++;
    
    updateClicksDisplay();
    
    if (currentCharacterIndex >= characters.length || Object.values(clicksLeft).every(count => count === 0)) {
        showResults();
    } else {
        showCharacter(currentCharacterIndex);
    }
}

function showResults() {
    document.querySelector('.character-container').style.display = 'none';
    document.querySelector('.actions').style.display = 'none';
    document.querySelector('.progress').style.display = 'none';
    document.querySelector('.counter').style.display = 'none';
    document.querySelector('.gifs').style.display = 'none';
    document.querySelector('.clicks-counter').style.display = 'none';
    resultsSection.style.display = 'block';
    casaCount.textContent = choices.casa.length;
    beijaCount.textContent = choices.beija.length;
    mataCount.textContent = choices.mata.length;
    displayCharacterGrid('casa', choices.casa);
    displayCharacterGrid('beija', choices.beija);
    displayCharacterGrid('mata', choices.mata);
}

function displayCharacterGrid(action, chars) {
    chars.forEach(character => {
        const thumb = document.createElement('img');
        thumb.className = 'character-thumb';
        thumb.src = character.image;
        thumb.alt = character.name;
        thumb.title = character.name;
        if (action === 'casa') {
            thumb.style.border = '3px solid #81C2DE';
        } else if (action === 'beija') {
            thumb.style.border = '3px solid #D5889B';
        } else {
            thumb.style.border = '3px solid #9F5E9E';
        }
        characterGrid.appendChild(thumb);
    });
}

function restartGame() {
    currentCharacterIndex = 0;
    choices = { casa: [], beija: [], mata: [] };
    clicksLeft = { casa: 10, beija: 10, mata: 10 };
    characterGrid.innerHTML = '';
    
    document.querySelector('.character-container').style.display = 'block';
    document.querySelector('.actions').style.display = 'flex';
    document.querySelector('.progress').style.display = 'block';
    document.querySelector('.counter').style.display = 'block';
    document.querySelector('.gifs').style.display = 'flex';
    document.querySelector('.clicks-counter').style.display = 'flex';
    resultsSection.style.display = 'none';
    
    const newSelectedIndexes = [];
    while (newSelectedIndexes.length < 30) {
        const randomIndex = Math.floor(Math.random() * totalCharacters) + 1;
        if (!newSelectedIndexes.includes(randomIndex)) {
            newSelectedIndexes.push(randomIndex);
        }
    }
    
    newSelectedIndexes.forEach((index, i) => {
        characters[i] = {
            name: `Personagem ${i + 1}`,
            image: `src/images/personagens/personagem-${index}.png`
        };
    });
    
    showCharacter(0);
    updateClicksDisplay();
}

window.addEventListener('load', initGame);