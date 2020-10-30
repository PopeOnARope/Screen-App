import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchAuthId } from '../utils/connectors';
import Container from './components/Container';

// get the authid for big parser and inject it here.
const ConnectedContainer = () => {
  // TODO: ADD ERROR HANDLING AND LOAD
  const [authId, setAuthId] = useState([]);

  useEffect(() => {
    fetchAuthId().then(result => {
      console.log({ result });
      setAuthId(result.authId);
    });
  }, []);
  return <Container authId={authId} />;
};

ReactDOM.render(<ConnectedContainer />, document.getElementById('index'));
