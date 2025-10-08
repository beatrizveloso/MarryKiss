import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaKiss, FaSkull, FaSave, FaArrowLeft, FaCheck, FaClock, FaCrown, FaRandom, FaUserFriends, FaExclamationTriangle } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import './MarryKiss.css';

const marrySound = new Audio('/sounds/plim.mp3');
const kissSound = new Audio('/sounds/kiss.mp3');
const killSound = new Audio('/sounds/roblox-death.mp3');

const GameModeSelector = ({ onSelectMode }) => {
  const gameModes = [
    { id: 'classic', image: '/images/modo-classico.png' },
    { id: 'custom', image: '/images/modo-personalizado.png' },
    { id: 'ranking', image: '/images/modo-ranking.png' },
    { id: 'timed', image: '/images/modo-tempo.png' },
    { id: 'single', image: '/images/modo-unica.png' },
    { id: 'cards', image: '/images/modo-cartas.png' },
    { id: 'reversed', image: '/images/modo-invertido.png' }
  ];

  const modeInstructions = {
    classic: {
      title: "Modo Clássico",
      description: "O modo original sem limites! Casa, beija ou mata quantos personagens quiser sem restrições."
    },
    custom: {
      title: "Modo Personalizado",
      description: "Escolha categorias específicas de personagens para jogar com seus favoritos."
    },
    ranking: {
      title: "Ranking entre Amigos",
      description: "Duas rodadas sequenciais para comparar resultados com um amigo."
    },
    timed: {
      title: "Contra o Tempo",
      description: "Responda em até 5 segundos para cada personagem!"
    },
    single: {
      title: "Rodada Única",
      description: "Apenas 3 personagens e você só pode escolher cada ação uma vez."
    },
    cards: {
      title: "Cartas Misteriosas",
      description: "Personagens revelados apenas após sua escolha. Surpresa total!"
    },
    reversed: {
      title: "Modo Invertido",
      description: "As ações estão trocadas - descubra no final o que você realmente escolheu!"
    }
  };

  const [selectedMode, setSelectedMode] = useState(null);
  const [showInstruction, setShowInstruction] = useState(false);

  const handleModeSelect = (modeId) => {
    setSelectedMode(modeId);
    setShowInstruction(true);
  };

  const handleConfirm = () => {
    setShowInstruction(false);
    onSelectMode(selectedMode);
  };

  if (showInstruction && selectedMode) {
    return (
      <div className="instruction-modal">
        <div className="instruction-content">
          <h2>{modeInstructions[selectedMode].title}</h2>
          <p>{modeInstructions[selectedMode].description}</p>
          <button className="confirm-btn" onClick={handleConfirm}>
            <FaCheck /> Começar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mode-selector-container">
      <div className="mode-selector-header">
        <div className="gif-container">
          <img src="http://www.gigaglitters.com/created/UW16Nm9wE1.gif" width="490" height="80" alt="Escolha seu"/>
          <div className="align-gif">
            <img src="http://www.gigaglitters.com/created/biHCvObvli.gif" width="550" height="80" alt="Modo de Jogo"/>
          </div>
        </div>
      </div>
      
   <div className="mode-grid">
  <div className="mode-row">
    {gameModes.slice(0, 3).map((mode) => (
      <div 
        key={mode.id}
        className="mode-card"
        onClick={() => handleModeSelect(mode.id)}
      >
        <img src={mode.image} alt={mode.id} className="mode-image" />
      </div>
    ))}
  </div>

  <div className="mode-row">
    {gameModes.slice(3, 6).map((mode) => (
      <div 
        key={mode.id}
        className="mode-card"
        onClick={() => handleModeSelect(mode.id)}
      >
        <img src={mode.image} alt={mode.id} className="mode-image" />
      </div>
    ))}
  </div>

  <div className="mode-row">
    {gameModes.slice(6, 7).map((mode) => (
      <div 
        key={mode.id}
        className="mode-card"
        onClick={() => handleModeSelect(mode.id)}
      >
        <img src={mode.image} alt={mode.id} className="mode-image" />
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

const ClassicModeConfig = ({ onStart, onBack }) => {
  const [charactersCount, setCharactersCount] = useState(20);

  return (
    <div className="config-modal">
      <div className="config-content">
        <h2>Modo Clássico - Configuração</h2>
        <p>Quantos personagens por rodada?</p>
        
        <div className="options-grid">
          {[10, 15, 20, 30].map((count) => (
            <div 
              key={count}
              className={`option-circle ${charactersCount === count ? 'selected' : ''}`}
              onClick={() => setCharactersCount(count)}
            >
              {charactersCount === count && <FaCheck className="check-icon" />}
              <span>{count}</span>
            </div>
          ))}
        </div>

        <div className="config-buttons">
          <button className="start-config-btn" onClick={() => onStart(charactersCount)}>
            <FaCheck /> Confirmar
          </button>
          <button className="back-config-btn" onClick={onBack}>
            <FaArrowLeft /> Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomModeConfig = ({ onStart, onBack }) => {
  const [categories, setCategories] = useState([
    { id: 'actors', name: 'Atores', selected: false },
    { id: 'heroes', name: 'Heróis', selected: false },
    { id: 'singers', name: 'Cantores', selected: false },
    { id: 'brazilians', name: 'Brasileiros', selected: false },
    { id: 'characters', name: 'Personagens', selected: false }
  ]);

  const toggleCategory = (categoryId) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
    ));
  };

  const handleStart = () => {
    const selectedCategories = categories.filter(cat => cat.selected);
    if (selectedCategories.length === 0) {
      alert('Selecione pelo menos uma categoria!');
      return;
    }
    onStart(selectedCategories);
  };

  return (
    <div className="config-modal">
      <div className="config-content">
        <h2>Modo Personalizado</h2>
        <p>Escolha as categorias:</p>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`category-option ${category.selected ? 'selected' : ''}`}
              onClick={() => toggleCategory(category.id)}
            >
              {category.selected && <FaCheck className="check-icon" />}
              <span>{category.name}</span>
            </div>
          ))}
        </div>

        <div className="config-buttons">
          <button className="start-config-btn" onClick={handleStart}>
            <FaCheck /> Começar Jogo
          </button>
          <button className="back-config-btn" onClick={onBack}>
            <FaArrowLeft /> Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

const MarryKiss = () => {
  const [currentMode, setCurrentMode] = useState(null);
  const [showClassicConfig, setShowClassicConfig] = useState(false);
  const [showCustomConfig, setShowCustomConfig] = useState(false);
  const [gameConfig, setGameConfig] = useState({});

  const handleModeSelect = (mode) => {
    if (mode === 'classic') {
      setShowClassicConfig(true);
    } else if (mode === 'custom') {
      setShowCustomConfig(true);
    } else {
      setCurrentMode(mode);
    }
  };

  const handleClassicStart = (charactersCount) => {
    setGameConfig({ characters: charactersCount });
    setShowClassicConfig(false);
    setCurrentMode('classic');
  };

  const handleCustomStart = (selectedCategories) => {
    setGameConfig({ categories: selectedCategories });
    setShowCustomConfig(false);
    setCurrentMode('custom');
  };

  if (showClassicConfig) {
    return <ClassicModeConfig onStart={handleClassicStart} onBack={() => setShowClassicConfig(false)} />;
  }

  if (showCustomConfig) {
    return <CustomModeConfig onStart={handleCustomStart} onBack={() => setShowCustomConfig(false)} />;
  }

  if (currentMode === null) {
    return <GameModeSelector onSelectMode={handleModeSelect} />;
  }

  return (
    <GameScreen 
      mode={currentMode} 
      config={gameConfig}
      onBack={() => setCurrentMode(null)}
    />
  );
};

const GameScreen = ({ mode, config, onBack }) => {
  const canvasRef = useRef(null);
  
  const characterPool = {
    heroes: ['clark-kent', 'tony-stark', 'batman', 'thor', 'superman', 'deadpool', 'capitao-america', 'loki', 'peter-parker', 'bucky'],
    actors: ['wagner-moura', 'pedro-novaes', 'vladimir-brichta', 'the-rock', 'rodrigo-hilbert', 'michael-b-jordan', 'adriano', 'ronaldo-sobral', 'rodrigo-simas', 'tom-hiddleston', 'brad-pitt', 'leonardo-dicaprio', 'johnny-depp', 'tom-cruise', 'jason-momoa', 'keanu-reeves', 'ryan-reynolds', 'tom-holland', 'hugh-jackman'],
    singers: ['harry-styles', 'justin-bieber', 'shawn-mendes', 'zayn-malik', 'bruno-mars'],
    brazilians: ['wagner-moura', 'pedro-novaes', 'vladimir-brichta', 'rodrigo-hilbert', 'adriano', 'ronaldo-sobral', 'rodrigo-simas'],
    characters: ['ben-10', 'damon-salvatore', 'christian-grey', 'dean-winchester', 'toretto', 'george-weasley', 'thomas-shelby', 'detona-ralph', 'sherlock-holmes', 'jack-frost', 'raposa-do-zootopia', 'harry-potter', 'draco-malfoy', 'croods', 'javier-pena']
  };

  const getConfig = () => {
    switch(mode) {
      case 'classic': return { 
        characters: config.characters || 20, 
        timer: null, 
        singleRound: false, 
        cards: false, 
        reversed: false, 
        limited: false 
      };
      case 'custom': return { 
        characters: 20, 
        timer: null, 
        singleRound: false, 
        cards: false, 
        reversed: false, 
        limited: false,
        categories: config.categories 
      };
      case 'ranking': return { 
        characters: 15, 
        timer: null, 
        singleRound: false, 
        cards: false, 
        reversed: false, 
        limited: true, 
        rounds: 2 
      };
      case 'timed': return { 
        characters: 20, 
        timer: 5, 
        singleRound: false, 
        cards: false, 
        reversed: false, 
        limited: true 
      };
      case 'single': return { 
        characters: 3, 
        timer: null, 
        singleRound: true, 
        cards: false, 
        reversed: false, 
        limited: true 
      };
      case 'cards': return { 
        characters: 10, 
        timer: null, 
        singleRound: false, 
        cards: true, 
        reversed: false, 
        limited: false 
      };
      case 'reversed': return { 
        characters: 3, 
        timer: null, 
        singleRound: false, 
        cards: false, 
        reversed: true, 
        limited: false 
      };
      default: return { 
        characters: 20, 
        timer: null, 
        singleRound: false, 
        cards: false, 
        reversed: false, 
        limited: true 
      };
    }
  };

  const gameConfig = getConfig();
  const [characters, setCharacters] = useState([]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [choices, setChoices] = useState({ casa: [], beija: [], mata: [] });
  const [clicksLeft, setClicksLeft] = useState({ 
    casa: gameConfig.limited ? (mode === 'ranking' ? 5 : 10) : 999, 
    beija: gameConfig.limited ? (mode === 'ranking' ? 5 : 10) : 999, 
    mata: gameConfig.limited ? (mode === 'ranking' ? 5 : 10) : 999 
  });
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameConfig.timer);
  const [singleRoundChoices, setSingleRoundChoices] = useState({ casa: null, beija: null, mata: null });
  const [reversedActions, setReversedActions] = useState({});
  const [currentRound, setCurrentRound] = useState(1);
  const [playerChoices, setPlayerChoices] = useState([{ casa: [], beija: [], mata: [] }, { casa: [], beija: [], mata: [] }]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [revealedCards, setRevealedCards] = useState([]);

  useEffect(() => {
    initializeCharacters();
    if (gameConfig.timer) {
      setTimeLeft(gameConfig.timer);
    }
  }, [mode, currentRound]);

  useEffect(() => {
    if (gameConfig.timer && timeLeft > 0 && !gameFinished && currentCharacterIndex < characters.length) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameConfig.timer && timeLeft === 0 && !gameFinished) {
      handleChoice('mata');
    }
  }, [gameConfig.timer, timeLeft, gameFinished, currentCharacterIndex, characters.length]);

  const initializeCharacters = () => {
    let availableCharacters = [];
    
    if (mode === 'custom' && config.categories) {
      config.categories.forEach(category => {
        if (characterPool[category.id]) {
          availableCharacters = [...availableCharacters, ...characterPool[category.id]];
        }
      });
    } else {
      availableCharacters = [
        ...characterPool.heroes,
        ...characterPool.actors,
        ...characterPool.singers,
        ...characterPool.brazilians,
        ...characterPool.characters
      ];
    }

    const shuffled = [...new Set(availableCharacters)].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, gameConfig.characters);

    const newCharacters = selected.map((character, index) => ({
      id: index,
      name: character.replace(/-/g, ' '),
      image: `/images/personagens/${character}.png`,
      revealed: false
    }));

    setCharacters(newCharacters);
    setRevealedCards([]);

    if (gameConfig.reversed) {
      const actions = ['casa', 'beija', 'mata'];
      const shuffledActions = [...actions].sort(() => Math.random() - 0.5);
      setReversedActions({
        casa: shuffledActions[0],
        beija: shuffledActions[1],
        mata: shuffledActions[2]
      });
    }
  };

  const playSound = (action) => {
    try {
      switch(action) {
        case 'casa':
          marrySound.currentTime = 0;
          marrySound.play();
          break;
        case 'beija':
          kissSound.currentTime = 0;
          kissSound.play();
          break;
        case 'mata':
          killSound.currentTime = 0;
          killSound.play();
          break;
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const handleChoice = (action) => {
    if (gameConfig.limited && clicksLeft[action] <= 0) return;
    if (gameConfig.singleRound && singleRoundChoices[action]) return;

    const currentCharacter = characters[currentCharacterIndex];
    const finalAction = gameConfig.reversed ? reversedActions[action] : action;
    
    playSound(action);

    if (gameConfig.cards) {
      const updatedCharacters = characters.map((char, index) => 
        index === currentCharacterIndex ? { ...char, revealed: true } : char
      );
      setCharacters(updatedCharacters);
      setRevealedCards(prev => [...prev, { character: currentCharacter, action: finalAction }]);
    }

    if (gameConfig.singleRound) {
      const newChoices = { ...singleRoundChoices };
      newChoices[action] = currentCharacter;
      setSingleRoundChoices(newChoices);

      const filledChoices = Object.values(newChoices).filter(Boolean);
      if (filledChoices.length === 3) {
        const finalChoices = {
          casa: newChoices.casa ? [newChoices.casa] : [],
          beija: newChoices.beija ? [newChoices.beija] : [],
          mata: newChoices.mata ? [newChoices.mata] : []
        };
        setChoices(finalChoices);
        setGameFinished(true);
        return;
      }
    } else {
      const newChoices = { ...choices };
      newChoices[finalAction].push(currentCharacter);
      setChoices(newChoices);

      if (gameConfig.limited) {
        const newClicksLeft = { ...clicksLeft };
        newClicksLeft[action]--;
        setClicksLeft(newClicksLeft);
      }
    }

    if (gameConfig.ranking) {
      const newPlayerChoices = [...playerChoices];
      newPlayerChoices[currentPlayer][finalAction].push(currentCharacter);
      setPlayerChoices(newPlayerChoices);
    }

    const nextIndex = currentCharacterIndex + 1;
    setCurrentCharacterIndex(nextIndex);

    if (gameConfig.timer) {
      setTimeLeft(gameConfig.timer);
    }

    if (nextIndex >= characters.length) {
      if (gameConfig.ranking && currentRound < gameConfig.rounds) {
        setCurrentRound(currentRound + 1);
        setCurrentPlayer(1);
        setCurrentCharacterIndex(0);
        setCharacters([]);
        setTimeout(() => initializeCharacters(), 500);
      } else {
        setGameFinished(true);
      }
    }
  };

  const saveAsPng = () => {
    const resultsContainer = document.querySelector('.marrykiss-results');
    if (!resultsContainer) return;

    html2canvas(resultsContainer).then(canvas => {
      const link = document.createElement('a');
      link.download = 'resultado-marrykiss.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const restartGame = () => {
    setCurrentCharacterIndex(0);
    setChoices({ casa: [], beija: [], mata: [] });
    setClicksLeft({ 
      casa: gameConfig.limited ? (mode === 'ranking' ? 5 : 10) : 999, 
      beija: gameConfig.limited ? (mode === 'ranking' ? 5 : 10) : 999, 
      mata: gameConfig.limited ? (mode === 'ranking' ? 5 : 10) : 999 
    });
    setGameFinished(false);
    setSingleRoundChoices({ casa: null, beija: null, mata: null });
    setTimeLeft(gameConfig.timer);
    setReversedActions({});
    setCurrentRound(1);
    setCurrentPlayer(0);
    setPlayerChoices([{ casa: [], beija: [], mata: [] }, { casa: [], beija: [], mata: [] }]);
    setRevealedCards([]);
    initializeCharacters();
  };

  const currentCharacter = characters[currentCharacterIndex];

  if (gameFinished) {
    if (gameConfig.ranking) {
      const player1 = playerChoices[0];
      const player2 = playerChoices[1];
      
      const commonMarry = player1.casa.filter(char1 => 
        player2.casa.some(char2 => char1.id === char2.id)
      );
      const commonKiss = player1.beija.filter(char1 => 
        player2.beija.some(char2 => char1.id === char2.id)
      );
      const commonKill = player1.mata.filter(char1 => 
        player2.mata.some(char2 => char1.id === char2.id)
      );

      return (
        <div className="marrykiss-container">
          <div className="marrykiss-results">
            <h2><FaCrown /> Ranking entre Amigos</h2>
            
            <div className="ranking-comparison">
              <div className="player-result">
                <h3>Jogador 1</h3>
                <div className="player-stats">
                  <div><FaHeart /> Casar: {player1.casa.length}</div>
                  <div><FaKiss /> Beijar: {player1.beija.length}</div>
                  <div><FaSkull /> Matar: {player1.mata.length}</div>
                </div>
                <div className="character-thumbnails">
                  {player1.casa.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                  {player1.beija.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                  {player1.mata.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                </div>
              </div>
              
              <div className="player-result">
                <h3>Jogador 2</h3>
                <div className="player-stats">
                  <div><FaHeart /> Casar: {player2.casa.length}</div>
                  <div><FaKiss /> Beijar: {player2.beija.length}</div>
                  <div><FaSkull /> Matar: {player2.mata.length}</div>
                </div>
                <div className="character-thumbnails">
                  {player2.casa.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                  {player2.beija.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                  {player2.mata.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                </div>
              </div>
            </div>

            <div className="shared-choices">
              <h3>Escolhas em Comum</h3>
              <div className="common-choices">
                <div className={`common-choice ${commonMarry.length > 0 ? 'highlight' : ''}`}>
                  <FaHeart /> Casar: {commonMarry.length}
                </div>
                <div className={`common-choice ${commonKiss.length > 0 ? 'highlight' : ''}`}>
                  <FaKiss /> Beijar: {commonKiss.length}
                </div>
                <div className={`common-choice ${commonKill.length > 0 ? 'highlight' : ''}`}>
                  <FaSkull /> Matar: {commonKill.length}
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="marrykiss-restart-btn" onClick={restartGame}>
                Jogar Novamente
              </button>
              <button className="marrykiss-back-btn" onClick={onBack}>
                <FaArrowLeft /> Voltar aos Modos
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (gameConfig.cards) {
      const finalChoices = {
        casa: revealedCards.filter(card => card.action === 'casa').map(card => card.character),
        beija: revealedCards.filter(card => card.action === 'beija').map(card => card.character),
        mata: revealedCards.filter(card => card.action === 'mata').map(card => card.character)
      };

      return (
        <div className="marrykiss-container">
          <div className="marrykiss-results">
            <h2>Cartas Misteriosas - Resultado Final</h2>
            
            <div className="character-images-results">
              {finalChoices.casa.length > 0 && (
                <div className="result-category">
                  <h4><FaHeart /> Casamentos</h4>
                  <div className="character-thumbnails">
                    {finalChoices.casa.map((char, index) => (
                      <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                    ))}
                  </div>
                </div>
              )}
              {finalChoices.beija.length > 0 && (
                <div className="result-category">
                  <h4><FaKiss /> Beijos</h4>
                  <div className="character-thumbnails">
                    {finalChoices.beija.map((char, index) => (
                      <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                    ))}
                  </div>
                </div>
              )}
              {finalChoices.mata.length > 0 && (
                <div className="result-category">
                  <h4><FaSkull /> Mortes</h4>
                  <div className="character-thumbnails">
                    {finalChoices.mata.map((char, index) => (
                      <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="marrykiss-restart-btn" onClick={restartGame}>
                Jogar Novamente
              </button>
              <button className="marrykiss-back-btn" onClick={onBack}>
                <FaArrowLeft /> Voltar aos Modos
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (gameConfig.reversed) {
      return (
        <div className="marrykiss-container">
          <div className="marrykiss-results">
            <h2>Modo Invertido - Fim de Jogo</h2>
            <div className="reversed-reveal">
              <h3>Revelação das Ações:</h3>
              <p><img src="/images/marry.png" alt="Casar" className="action-reveal-icon" /> = <strong>{reversedActions.casa === 'casa' ? 'Casar' : reversedActions.casa === 'beija' ? 'Beijar' : 'Matar'}</strong></p>
              <p><img src="/images/kiss.png" alt="Beijar" className="action-reveal-icon" /> = <strong>{reversedActions.beija === 'casa' ? 'Casar' : reversedActions.beija === 'beija' ? 'Beijar' : 'Matar'}</strong></p>
              <p><img src="/images/kill.png" alt="Matar" className="action-reveal-icon" /> = <strong>{reversedActions.mata === 'casa' ? 'Casar' : reversedActions.mata === 'beija' ? 'Beijar' : 'Matar'}</strong></p>
            </div>

            <div className="character-images-results">
              {choices.casa.length > 0 && (
                <div className="result-category">
                  <h4><FaHeart /> Casamentos</h4>
                  <div className="character-thumbnails">
                    {choices.casa.map((char, index) => (
                      <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                    ))}
                  </div>
                </div>
              )}
              {choices.beija.length > 0 && (
                <div className="result-category">
                  <h4><FaKiss /> Beijos</h4>
                  <div className="character-thumbnails">
                    {choices.beija.map((char, index) => (
                      <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                    ))}
                  </div>
                </div>
              )}
              {choices.mata.length > 0 && (
                <div className="result-category">
                  <h4><FaSkull /> Mortes</h4>
                  <div className="character-thumbnails">
                    {choices.mata.map((char, index) => (
                      <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="marrykiss-restart-btn" onClick={restartGame}>
                Jogar Novamente
              </button>
              <button className="marrykiss-back-btn" onClick={onBack}>
                <FaArrowLeft /> Voltar aos Modos
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="marrykiss-container">
        <div className="marrykiss-results">
          <img src="http://www.gigaglitters.com/created/JCQbDFI3Oc.gif" width="399" height="67" border="0" alt="Resultado Final"/>
          
          <div className="character-images-results">
            {choices.casa.length > 0 && (
              <div className="result-category">
                <h4><FaHeart /> Casamentos</h4>
                <div className="character-thumbnails">
                  {choices.casa.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                </div>
              </div>
            )}
            {choices.beija.length > 0 && (
              <div className="result-category">
                <h4><FaKiss /> Beijos</h4>
                <div className="character-thumbnails">
                  {choices.beija.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                </div>
              </div>
            )}
            {choices.mata.length > 0 && (
              <div className="result-category">
                <h4><FaSkull /> Mortes</h4>
                <div className="character-thumbnails">
                  {choices.mata.map((char, index) => (
                    <img key={index} src={char.image} alt={char.name} className="character-thumb" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="share-buttons">
            <button className="share-btn save" onClick={saveAsPng}>
              <FaSave /> Salvar PNG
            </button>
          </div>

          <div className="action-buttons">
            <button className="marrykiss-restart-btn" onClick={restartGame}>
              Jogar Novamente
            </button>
            <button className="marrykiss-back-btn" onClick={onBack}>
              <FaArrowLeft /> Voltar aos Modos
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCharacter) {
    return (
      <div className="marrykiss-container">
        <div className="loading-screen">
          <h2>Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="marrykiss-container">
      <button className="back-button" onClick={onBack}>
        <FaArrowLeft /> Voltar
      </button>
      
      {gameConfig.ranking && (
        <div className="player-indicator">
          <FaUserFriends /> Jogador {currentPlayer + 1}
        </div>
      )}

      <div className="game-content">
        <div className="marrykiss-gifs">
          <div className="gif-container">
            <img src="http://www.gigaglitters.com/created/XlVRYtOeJf.gif" width="420" height="130" alt="Clique no seu" />
            <div className="gif-destino">
              <img src="http://www.gigaglitters.com/created/PlTwvLjqPJ.gif" width="270" height="130" alt="destino!" />
            </div>
          </div>
        </div>

        {gameConfig.timer && (
          <div className="timer">
            <FaClock /> {timeLeft}s
          </div>
        )}

        <div className="marrykiss-character-container">
          <img 
            className={`marrykiss-character-image ${gameConfig.cards && !currentCharacter.revealed ? 'hidden' : ''}`} 
            src={currentCharacter.image} 
            alt={currentCharacter.name} 
          />
          {gameConfig.cards && !currentCharacter.revealed && (
            <div className="card-back">
              <FaRandom className="card-icon" />
              <span>Mistério</span>
            </div>
          )}
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

        {!gameConfig.singleRound && gameConfig.limited && (
          <div className="marrykiss-clicks-counter">
            <div className="marrykiss-click-info"><FaHeart />: {clicksLeft.casa}</div>
            <div className="marrykiss-click-info"><FaKiss />: {clicksLeft.beija}</div>
            <div className="marrykiss-click-info"><FaSkull />: {clicksLeft.mata}</div>
          </div>
        )}

        {gameConfig.singleRound && (
          <div className="single-round-info">
            <div><FaHeart />: {singleRoundChoices.casa ? '✓' : '?'}</div>
            <div><FaKiss />: {singleRoundChoices.beija ? '✓' : '?'}</div>
            <div><FaSkull />: {singleRoundChoices.mata ? '✓' : '?'}</div>
          </div>
        )}

        <div className="marrykiss-actions">
          <button 
            className="marrykiss-action-btn marrykiss-casa" 
            onClick={() => handleChoice('casa')}
            disabled={(gameConfig.limited && clicksLeft.casa === 0) || (gameConfig.timer && timeLeft === 0) || (gameConfig.singleRound && singleRoundChoices.casa)}
            title="Casar"
          />
          <button 
            className="marrykiss-action-btn marrykiss-beija" 
            onClick={() => handleChoice('beija')}
            disabled={(gameConfig.limited && clicksLeft.beija === 0) || (gameConfig.timer && timeLeft === 0) || (gameConfig.singleRound && singleRoundChoices.beija)}
            title="Beijar"
          />
          <button 
            className="marrykiss-action-btn marrykiss-mata" 
            onClick={() => handleChoice('mata')}
            disabled={(gameConfig.limited && clicksLeft.mata === 0) || (gameConfig.timer && timeLeft === 0) || (gameConfig.singleRound && singleRoundChoices.mata)}
            title="Matar"
          />
        </div>

        {gameConfig.timer && timeLeft < 3 && (
          <div className="time-warning">
            <FaExclamationTriangle /> Rápido!
          </div>
        )}
      </div>
    </div>
  );
};

export default MarryKiss;