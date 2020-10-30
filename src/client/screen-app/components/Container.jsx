import React, { useEffect, useState } from 'react';
import CallHistory from './MessageHistory';
import { getAndCombineCandidateHistory } from '../../utils/connectors';
const CANDIDATE_NUMBER = '12345';

/*  

Higher order component that manages which view is rendered based on the application state.
* needs to be able to -
* 1. when the application loads -
    -get selected row from spread sheet.
    -if no row is selected, display <NoCandidateSelected/>
    -if a row is selected, query the message history and call history for the candidate,
    -splice the two together
    -and display the messages component
  2. When the user selects a candidate
    -query the user's message/call history and display
      -if request fails, get a new auth token from big parser

* */

// This component will handle switching out the different main components of the app.

const Container = ({ authId, candidateHistory }) => {
  // TODO find a clean way to listen for changes in the sheet

  return (
    <div>
      <p>Container</p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {candidateHistory.map(({ Message, MessageId }) => (
          <div key={MessageId} style={{ border: '1px solid lightblue' }}>
            {Message}
          </div>
        ))}
        <code>{JSON.stringify(candidateHistory)}</code>
      </pre>
      <CallHistory />
    </div>
  );
};

const ContainerWithMessageData = props => {
  // TODO: ADD ERROR HANDLING AND LOAD
  const [candidateHistory, setCandidateHistory] = useState([]);

  useEffect(() => {
    getAndCombineCandidateHistory({
      authId: props.authId,
      candidateNumber: CANDIDATE_NUMBER,
    }).then(result => {
      console.log({ result });
      setCandidateHistory(result);
    });
  }, []);
  return candidateHistory.length ? (
    <Container {...props} candidateHistory={candidateHistory} />
  ) : (
    <p>loading...</p>
  );
};

export default ContainerWithMessageData;
