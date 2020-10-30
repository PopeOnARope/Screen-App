import React from 'react';
import CallHistory from './CallHistory';

/*  

Higher order component that manages which view is rendered based on the application state.
* needs to be able to -
* 1. when the application loads -
    -get an auth token from big parser
    -
    -get selected row from spread sheet.
    -if no row is selected, display <NoCandidateSelected/>
    -if a row is selected, query the message history and call history for the candidate,
    -splice the two together
    -and display the messages component
  2. When the user selects a candidate
    -query the user's message/call history and display
      -if request fails, get a new auth token from big parser

* */

const Container = ({ authId }) => {
  return (
    <div>
      <p>Container</p>
      <pre>{authId}</pre>
      <CallHistory />
    </div>
  );
};

export default Container;
