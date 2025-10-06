import React, { useState, useEffect } from 'react';
import './MarryKiss.css';

const MarryKiss = () => {
  const totalCharacters = 50;
  const [characters, setCharacters] = useState([]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [choices, setChoices] = useState({ casa: [], beija: [], mata: [] });
  const [clicksLeft, setClicksLeft] = useState({ casa: 10, beija: 10, mata: 10 });
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    initializeCharacters();
  }, []);

  const initializeCharacters = () => {
    const selectedIndexes = [];
    while (selectedIndexes.length < 30) {
      const randomIndex = Math.floor(Math.random() * totalCharacters) + 1;
      if (!selectedIndexes.includes(randomIndex)) {
        selectedIndexes.push(randomIndex);
      }
    }

    const newCharacters = selectedIndexes.map((index, i) => ({
      name: `Personagem ${i + 1}`,
      image: `/images/personagens/personagem-${index}.png`
    }));

    setCharacters(newCharacters);
  };

  const handleChoice = (action) => {
    if (clicksLeft[action] <= 0) return;

    const currentCharacter = characters[currentCharacterIndex];
    const newChoices = { ...choices };
    newChoices[action].push(currentCharacter);
    setChoices(newChoices);

    const newClicksLeft = { ...clicksLeft };
    newClicksLeft[action]--;
    setClicksLeft(newClicksLeft);

    const nextIndex = currentCharacterIndex + 1;
    setCurrentCharacterIndex(nextIndex);

    if (nextIndex >= characters.length || Object.values(newClicksLeft).every(count => count === 0)) {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentCharacterIndex(0);
    setChoices({ casa: [], beija: [], mata: [] });
    setClicksLeft({ casa: 10, beija: 10, mata: 10 });
    setGameFinished(false);
    initializeCharacters();
  };

  const currentCharacter = characters[currentCharacterIndex];

  if (gameFinished) {
    return (
      <div className="marrykiss-container">
        <div className="marrykiss-results">
          <img src="http://www.gigaglitters.com/created/ztfZycaR8a.gif" width="500" height="110" alt="Results" />

          <div className="marrykiss-result-item">
            <div className="marrykiss-result-icon marrykiss-casa-icon"></div>
            <div>Vocês casaram</div>
            <div className="marrykiss-result-count">{choices.casa.length}</div>
          </div>

          <div className="marrykiss-result-item">
            <div className="marrykiss-result-icon marrykiss-beija-icon"></div>
            <div>Vocês beijaram</div>
            <div className="marrykiss-result-count">{choices.beija.length}</div>
          </div>

          <div className="marrykiss-result-item">
            <div className="marrykiss-result-icon marrykiss-mata-icon"></div>
            <div>Você matou</div>
            <div className="marrykiss-result-count">{choices.mata.length}</div>
          </div>

          <h3 className="marrykiss-results-title">Personagens que você escolheu:</h3>
          <div className="marrykiss-character-grid">
            {choices.casa.map((character, index) => (
              <img
                key={`casa-${index}`}
                className="marrykiss-character-thumb"
                src={character.image}
                alt={character.name}
                style={{ border: '3px solid #81C2DE' }}
              />
            ))}
            {choices.beija.map((character, index) => (
              <img
                key={`beija-${index}`}
                className="marrykiss-character-thumb"
                src={character.image}
                alt={character.name}
                style={{ border: '3px solid #D5889B' }}
              />
            ))}
            {choices.mata.map((character, index) => (
              <img
                key={`mata-${index}`}
                className="marrykiss-character-thumb"
                src={character.image}
                alt={character.name}
                style={{ border: '3px solid #9F5E9E' }}
              />
            ))}
          </div>

          <button className="marrykiss-restart-btn" onClick={restartGame}>
            Jogar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!currentCharacter) {
    return <div className="marrykiss-container">Carregando...</div>;
  }

  return (
    <div className="marrykiss-container">
      <div className="marrykiss-gifs">
        <div className="marrykiss-gif-one">
          <img src="http://www.gigaglitters.com/created/XlVRYtOeJf.gif" width="420" height="130" alt="Casa, beija" />
        </div>
        <div className="marrykiss-gif-two">
          <img src="http://www.gigaglitters.com/created/PlTwvLjqPJ.gif" width="270" height="130" alt="ou mata!" />
        </div>
      </div>

      <div className="marrykiss-character-container">
        <img className="marrykiss-character-image" src={currentCharacter.image} alt={currentCharacter.name} />
      </div>

      <div className="marrykiss-progress">
        <div 
          className="marrykiss-progress-bar" 
          style={{ width: `${(currentCharacterIndex / characters.length) * 100}%` }}
        ></div>
      </div>

      <div className="marrykiss-counter">
        <p>Personagem {currentCharacterIndex + 1} de {characters.length}</p>
      </div>

      <div className="marrykiss-clicks-counter">
        <div className="marrykiss-click-info">Casar: {clicksLeft.casa} restantes</div>
        <div className="marrykiss-click-info">Beijar: {clicksLeft.beija} restantes</div>
        <div className="marrykiss-click-info">Matar: {clicksLeft.mata} restantes</div>
      </div>

      <div className="marrykiss-actions">
        <button 
          className="marrykiss-action-btn marrykiss-casa" 
          onClick={() => handleChoice('casa')}
          disabled={clicksLeft.casa === 0}
        ></button>
        <button 
          className="marrykiss-action-btn marrykiss-beija" 
          onClick={() => handleChoice('beija')}
          disabled={clicksLeft.beija === 0}
        ></button>
        <button 
          className="marrykiss-action-btn marrykiss-mata" 
          onClick={() => handleChoice('mata')}
          disabled={clicksLeft.mata === 0}
        ></button>
      </div>
    </div>
  );
};

export default MarryKiss;