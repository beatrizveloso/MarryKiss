import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-text-section">
        <div className="homepage-content-wrapper">
          <div className="homepage-intro-text">
            <p>One Time você diz yes, <br /> outra você diz no: <br /> but never say never!</p>
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