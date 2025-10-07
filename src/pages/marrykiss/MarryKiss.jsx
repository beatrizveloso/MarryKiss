import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaKiss, FaSkull, FaShare, FaSave, FaArrowLeft, FaCheck, FaClock, FaCrown, FaRandom, FaUserFriends, FaExclamationTriangle } from 'react-icons/fa';
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
          <img src="http://www.gigaglitters.com/created/UW16Nm9wE1.gif" width="290" height="80" alt="Escolha seu"/>
          <div className="align-gif">
          <img src="http://www.gigaglitters.com/created/biHCvObvli.gif" width="340" height="80" alt="Modo de Jogo"/>
        </div>
        </div>
      </div>
      
      <div className="mode-grid">
        {gameModes.map((mode) => (
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
  );
};

const MarryKiss = () => {
  const [currentMode, setCurrentMode] = useState(null);
  const [customCategories, setCustomCategories] = useState([]);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const categories = [
    { id: 'actors', name: 'Atores', selected: false },
    { id: 'heroes', name: 'Heróis', selected: false },
    { id: 'singers', name: 'Cantores', selected: false },
    { id: 'brazilians', name: 'Brasileiros', selected: false },
    { id: 'characters', name: 'Personagens', selected: false }
  ];

  if (currentMode === null) {
    return <GameModeSelector onSelectMode={(mode) => {
      if (mode === 'custom') {
        setShowCustomModal(true);
      } else {
        setCurrentMode(mode);
      }
    }} />;
  }

  if (showCustomModal) {
    return (
      <div className="custom-modal">
        <div className="custom-modal-content">
          <h2>Escolha as Categorias</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className={`category-circle ${category.selected ? 'selected' : ''}`}
                onClick={() => {
                  const updatedCategories = categories.map(cat => 
                    cat.id === category.id ? {...cat, selected: !cat.selected} : cat
                  );
                  setCustomCategories(updatedCategories);
                }}
              >
                {category.selected && <FaCheck className="check-icon" />}
                <span>{category.name}</span>
              </div>
            ))}
          </div>
          <button 
            className="start-custom-btn"
            onClick={() => {
              if (customCategories.filter(cat => cat.selected).length > 0) {
                setCurrentMode('custom');
                setShowCustomModal(false);
              } else {
                alert('Selecione pelo menos uma categoria!');
              }
            }}
          >
            <FaCheck /> Começar Jogo
          </button>
          <button 
            className="back-custom-btn"
            onClick={() => setShowCustomModal(false)}
          >
            <FaArrowLeft /> Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <GameScreen 
      mode={currentMode} 
      onBack={() => setCurrentMode(null)}
    />
  );
};

const GameScreen = ({ mode, onBack }) => {
  const canvasRef = useRef(null);
  
  const characterPool = {
    heroes: ['clark-kent', 'tony-stark', 'batman', 'thor', 'superman', 'deadpool', 'capitao-america', 'loki', 'peter-parker', 'bucky'],
    actors: ['wagner-moura', 'pedro-novaes', 'vladimir-brichta', 'the-rock', 'rodrigo-hilbert', 'michael-b-jordan', 'adriano', 'ronaldo-sobral', 'rodrigo-simas', 'tom-hiddleston', 'brad-pitt', 'leonardo-dicaprio', 'johnny-depp', 'tom-cruise', 'jason-momoa', 'keanu-reeves', 'ryan-reynolds', 'tom-holland', 'hugh-jackman'],
    singers: ['harry-styles', 'justin-bieber', 'shawn-mendes', 'zayn-malik', 'bruno-mars'],
    characters: ['ben-10', 'damon-salvatore', 'christian-grey', 'dean-winchester', 'toretto', 'george-weasley', 'thomas-shelby', 'detona-ralph', 'sherlock-holmes', 'jack-frost', 'raposa-do-zootopia', 'harry-potter', 'draco-malfoy', 'croods', 'javier-pena']
  };

  const getConfig = () => {
    switch(mode) {
      case 'classic': return { characters: 20, timer: null, singleRound: false, cards: false, reversed: false, limited: false };
      case 'custom': return { characters: 20, timer: null, singleRound: false, cards: false, reversed: false, limited: false };
      case 'ranking': return { characters: 15, timer: null, singleRound: false, cards: false, reversed: false, limited: true, rounds: 2 };
      case 'timed': return { characters: 20, timer: 5, singleRound: false, cards: false, reversed: false, limited: true };
      case 'single': return { characters: 3, timer: null, singleRound: true, cards: false, reversed: false, limited: true };
      case 'cards': return { characters: 15, timer: null, singleRound: false, cards: true, reversed: false, limited: true };
      case 'reversed': return { characters: 20, timer: null, singleRound: false, cards: false, reversed: true, limited: false };
      default: return { characters: 20, timer: null, singleRound: false, cards: false, reversed: false, limited: true };
    }
  };

  const config = getConfig();
  const [characters, setCharacters] = useState([]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [choices, setChoices] = useState({ casa: [], beija: [], mata: [] });
  const [clicksLeft, setClicksLeft] = useState({ casa: config.limited ? 10 : 999, beija: config.limited ? 10 : 999, mata: config.limited ? 10 : 999 });
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.timer);
  const [singleRoundChoices, setSingleRoundChoices] = useState({ casa: null, beija: null, mata: null });
  const [reversedActions, setReversedActions] = useState({});
  const [currentRound, setCurrentRound] = useState(1);
  const [playerChoices, setPlayerChoices] = useState([{}, {}]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    initializeCharacters();
    if (config.timer) {
      setTimeLeft(config.timer);
    }
  }, [mode, currentRound]);

  useEffect(() => {
    if (config.timer && timeLeft > 0 && !gameFinished && currentCharacterIndex < characters.length) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (config.timer && timeLeft === 0 && !gameFinished) {
      handleChoice('mata');
    }
  }, [config.timer, timeLeft, gameFinished, currentCharacterIndex, characters.length]);

  const initializeCharacters = () => {
    let availableCharacters = [];
    
    if (mode === 'custom') {
      availableCharacters = [
        ...characterPool.heroes,
        ...characterPool.actors,
        ...characterPool.singers,
        ...characterPool.characters
      ];
    } else {
      availableCharacters = [
        ...characterPool.heroes,
        ...characterPool.actors,
        ...characterPool.singers,
        ...characterPool.characters
      ];
    }

    const shuffled = [...availableCharacters].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, config.characters);

    const newCharacters = selected.map((character, index) => ({
      id: index,
      name: character.replace('-', ' '),
      image: `/images/personagens/${character}.png`,
      revealed: false
    }));

    setCharacters(newCharacters);

    if (config.reversed) {
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
    if (config.limited && clicksLeft[action] <= 0) return;

    const currentCharacter = characters[currentCharacterIndex];
    const finalAction = config.reversed ? reversedActions[action] : action;
    
    playSound(action);

    if (config.cards) {
      const updatedCharacters = characters.map((char, index) => 
        index === currentCharacterIndex ? { ...char, revealed: true } : char
      );
      setCharacters(updatedCharacters);
    }

    if (config.singleRound) {
      const newChoices = { ...singleRoundChoices };
      newChoices[finalAction] = currentCharacter;
      setSingleRoundChoices(newChoices);

      if (newChoices.casa && newChoices.beija && newChoices.mata) {
        const finalChoices = {
          casa: [newChoices.casa],
          beija: [newChoices.beija],
          mata: [newChoices.mata]
        };
        setChoices(finalChoices);
        setGameFinished(true);
        return;
      }
    } else {
      const newChoices = { ...choices };
      newChoices[finalAction].push(currentCharacter);
      setChoices(newChoices);

      if (config.limited) {
        const newClicksLeft = { ...clicksLeft };
        newClicksLeft[action]--;
        setClicksLeft(newClicksLeft);
      }
    }

    if (config.ranking) {
      const newPlayerChoices = [...playerChoices];
      if (!newPlayerChoices[currentPlayer - 1][finalAction]) {
        newPlayerChoices[currentPlayer - 1][finalAction] = [];
      }
      newPlayerChoices[currentPlayer - 1][finalAction].push(currentCharacter);
      setPlayerChoices(newPlayerChoices);
    }

    const nextIndex = currentCharacterIndex + 1;
    setCurrentCharacterIndex(nextIndex);

    if (config.timer) {
      setTimeLeft(config.timer);
    }

    if (nextIndex >= characters.length) {
      if (config.ranking && currentRound < config.rounds) {
        setCurrentRound(currentRound + 1);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        setCurrentCharacterIndex(0);
        setCharacters([]);
        setTimeout(() => initializeCharacters(), 500);
      } else {
        setGameFinished(true);
      }
    }
  };

  const getFinalPhrase = () => {
    const marryCount = choices.casa.length;
    const kissCount = choices.beija.length;
    const killCount = choices.mata.length;

    if (marryCount >= 8) {
      return "Você nasceu pra amar! O altar te espera, romântica incurável.";
    }

    if (kissCount >= 8) {
      return "Você espalha amor por onde passa! Beijar é sua forma de arte.";
    }

    if (killCount >= 8) {
      return "Socorro! Psicopata detectada. Você eliminou metade do elenco!";
    }

    return "Você foi equilibrado(a) em suas escolhas! Nem muito frio, nem muito quente.";
  };

  const saveAsPng = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    ctx.fillStyle = '#ca5371';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Resultado - Casa, Beija ou Mata', canvas.width / 2, 50);
    
    ctx.font = '20px Arial';
    ctx.fillText(`Casar: ${choices.casa.length}`, canvas.width / 2, 100);
    ctx.fillText(`Beijar: ${choices.beija.length}`, canvas.width / 2, 130);
    ctx.fillText(`Matar: ${choices.mata.length}`, canvas.width / 2, 160);
    
    const link = document.createElement('a');
    link.download = 'resultado-marrykiss.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const restartGame = () => {
    setCurrentCharacterIndex(0);
    setChoices({ casa: [], beija: [], mata: [] });
    setClicksLeft({ casa: config.limited ? 10 : 999, beija: config.limited ? 10 : 999, mata: config.limited ? 10 : 999 });
    setGameFinished(false);
    setSingleRoundChoices({ casa: null, beija: null, mata: null });
    setTimeLeft(config.timer);
    setReversedActions({});
    setCurrentRound(1);
    setCurrentPlayer(1);
    setPlayerChoices([{}, {}]);
    initializeCharacters();
  };

  const currentCharacter = characters[currentCharacterIndex];

  if (gameFinished) {
    if (config.ranking) {
      return (
        <div className="marrykiss-container">
          <div className="marrykiss-results">
            <h2><FaCrown /> Ranking entre Amigos</h2>
            
            <div className="ranking-comparison">
              <div className="player-result">
                <h3>Jogador 1</h3>
                <div>Casar: {playerChoices[0]?.casa?.length || 0}</div>
                <div>Beijar: {playerChoices[0]?.beija?.length || 0}</div>
                <div>Matar: {playerChoices[0]?.mata?.length || 0}</div>
              </div>
              
              <div className="player-result">
                <h3>Jogador 2</h3>
                <div>Casar: {playerChoices[1]?.casa?.length || 0}</div>
                <div>Beijar: {playerChoices[1]?.beija?.length || 0}</div>
                <div>Matar: {playerChoices[1]?.mata?.length || 0}</div>
              </div>
            </div>

            <div className="shared-choices">
              <h3>Escolhas em Comum</h3>
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
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      );
    }

    if (config.reversed) {
      return (
        <div className="marrykiss-container">
          <div className="marrykiss-results">
            <h2>Modo Invertido - Fim de Jogo</h2>
            <div className="reversed-reveal">
              <h3>Revelação das Ações:</h3>
              <p><FaHeart /> Casar = <strong>{reversedActions.casa === 'casa' ? 'Casar' : reversedActions.casa === 'beija' ? 'Beijar' : 'Matar'}</strong></p>
              <p><FaKiss /> Beijar = <strong>{reversedActions.beija === 'casa' ? 'Casar' : reversedActions.beija === 'beija' ? 'Beijar' : 'Matar'}</strong></p>
              <p><FaSkull /> Matar = <strong>{reversedActions.mata === 'casa' ? 'Casar' : reversedActions.mata === 'beija' ? 'Beijar' : 'Matar'}</strong></p>
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
          
          <div className="final-phrase">
            {getFinalPhrase()}
          </div>

          {/* <div className="results-grid">
            <div className="result-item">
              <FaHeart className="result-icon" />
              <span className="result-text">Vocês Casaram</span>
              <span className="result-count">{choices.casa.length}</span>
            </div>

            <div className="result-item">
              <FaKiss className="result-icon" />
              <span className="result-text">Vocês Beijaram</span>
              <span className="result-count">{choices.beija.length}</span>
            </div>

            <div className="result-item">
              <FaSkull className="result-icon" />
              <span className="result-text">Vocês Mataram</span>
              <span className="result-count">{choices.mata.length}</span>
            </div>
          </div> */}

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
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    );
  }

  if (!currentCharacter) {
    return <div className="marrykiss-container">Carregando...</div>;
  }

  return (
    <div className="marrykiss-container">
      <button className="back-button" onClick={onBack}>
        <FaArrowLeft /> Voltar
      </button>
      
      {config.ranking && (
        <div className="player-indicator">
          <FaUserFriends /> Jogador {currentPlayer}
        </div>
      )}

      <div className="marrykiss-gifs">
        <div className="gif-container">
          <img src="http://www.gigaglitters.com/created/XlVRYtOeJf.gif" width="420" height="130" alt="Clique no seu" />
          <img src="http://www.gigaglitters.com/created/PlTwvLjqPJ.gif" width="270" height="130" alt="destino!" />
        </div>
      </div>

      {config.timer && (
        <div className="timer">
          <FaClock /> {timeLeft}s
        </div>
      )}

      <div className="marrykiss-character-container">
        <img 
          className={`marrykiss-character-image ${config.cards && !currentCharacter.revealed ? 'hidden' : ''}`} 
          src={currentCharacter.image} 
          alt={currentCharacter.name} 
        />
        {config.cards && !currentCharacter.revealed && (
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

      {!config.singleRound && config.limited && (
        <div className="marrykiss-clicks-counter">
          <div className="marrykiss-click-info"><FaHeart />: {clicksLeft.casa}</div>
          <div className="marrykiss-click-info"><FaKiss />: {clicksLeft.beija}</div>
          <div className="marrykiss-click-info"><FaSkull />: {clicksLeft.mata}</div>
        </div>
      )}

      {config.singleRound && (
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
          disabled={(config.limited && clicksLeft.casa === 0) || (config.timer && timeLeft === 0) || (config.singleRound && singleRoundChoices.casa)}
          title="Casar"
        >
          <div className="button-content">
            <div className="button-icon"><FaHeart /></div>
            <div className="button-text">Casar</div>
          </div>
        </button>
        <button 
          className="marrykiss-action-btn marrykiss-beija" 
          onClick={() => handleChoice('beija')}
          disabled={(config.limited && clicksLeft.beija === 0) || (config.timer && timeLeft === 0) || (config.singleRound && singleRoundChoices.beija)}
          title="Beijar"
        >
          <div className="button-content">
            <div className="button-icon"><FaKiss /></div>
            <div className="button-text">Beijar</div>
          </div>
        </button>
        <button 
          className="marrykiss-action-btn marrykiss-mata" 
          onClick={() => handleChoice('mata')}
          disabled={(config.limited && clicksLeft.mata === 0) || (config.timer && timeLeft === 0) || (config.singleRound && singleRoundChoices.mata)}
          title="Matar"
        >
          <div className="button-content">
            <div className="button-icon"><FaSkull /></div>
            <div className="button-text">Matar</div>
          </div>
        </button>
      </div>

      {config.timer && timeLeft < 3 && (
        <div className="time-warning">
          <FaExclamationTriangle /> Rápido!
        </div>
      )}
    </div>
  );
};

export default MarryKiss;