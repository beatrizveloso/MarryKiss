import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  // const audioRef = useRef(null);

  // useEffect(() => {
  //   audioRef.current = new Audio('/sounds/onetime.mp3');
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //       audioRef.current.currentTime = 0;
  //     }
  //   };
  // }, []);

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="homepage-container" onClick={playAudio}>
      <div className="homepage-text-section">
        <div className="homepage-content-wrapper">
          <div className="homepage-intro-text">
            <p>
              One Time você diz yes, <br /> outra você diz no: <br /> but never say never!
            </p>
          </div>
        </div>
      </div>

      <Link to="/marrykiss">
        <button className="homepage-start-button"></button>
      </Link>
    </div>
  );
};

export default HomePage;
