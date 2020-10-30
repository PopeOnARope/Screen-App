import React, { useState, useEffect } from 'react';
import server from '../../utils/server';

const { serverFunctions } = server;

const CallHistory = props => {
  useEffect(() => {
    serverFunctions
      .getActiveRange()
      .then(r => {
        console.log(r);
      })
      .catch(alert);
  }, []);

  // debugger;
  return (
    <div>
      <p>Call History</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default CallHistory;
