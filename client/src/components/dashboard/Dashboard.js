import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row pt-4">
        <div className="col-md-12 mt-4 text-center">
          <FontAwesomeIcon icon={faCoins} size="9x" />
        </div>
        <div className="col-md-12 mt-3 text-center">
          <h4 className="text-muted">Track, analyze, adjust.</h4>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
