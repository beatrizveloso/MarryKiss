import React from 'react';
import './GameModeSelector.css';

const GameModeSelector = ({ onSelectMode }) => {
  const gameModes = [
    {
      id: 'classic',
      name: 'Modo Clássico',
      description: 'O jogo original com 30 personagens'
    },
    {
      id: 'custom',
      name: 'Modo Personalizado',
      description: 'Escolha categorias específicas de personagens'
    },
    {
      id: 'ranking',
      name: 'Ranking entre Amigos',
      description: 'Compare suas escolhas com amigos'
    },
    {
      id: 'timed',
      name: 'Contra o Tempo',
      description: 'Responda em até 5 segundos'
    },
    {
      id: 'single',
      name: 'Rodada Única',
      description: 'Apenas 3 personagens para escolher'
    },
    {
      id: 'cards',
      name: 'Cartas Misteriosas',
      description: 'Personagens revelados após escolha'
    },
    {
      id: 'reversed',
      name: 'Modo Invertido',
      description: 'As ações estão trocadas - surpresa no final!'
    }
  ];

  return (
    <div className="mode-selector-container">
      <div className="mode-selector-header">
        <h1>Escolha seu Modo de Jogo</h1>
      </div>
      
      <div className="mode-grid">
        {gameModes.map((mode) => (
          <div 
            key={mode.id}
            className="mode-card"
            onClick={() => onSelectMode(mode.id)}
          >
            <h3>{mode.name}</h3>
            <p>{mode.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;