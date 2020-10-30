const BASE_BP_LOGIN_URL =
  'https://qa.bigparser.com/APIServices/api/common/login';

const BASE_BP_GRID_URL = 'https://qa.bigparser.com/api/v2';

const LOGIN_CREDENTIALS = {
  emailId: 'popeshealthcare@gmail.com',
  password: 'bHippojones*888',
  loggedIn: true,
};

const MESSAGES_GRID_ID = '5f9c15a994a030055fadeed8';
const CALL_GRID_ID = '5f9c256394a030055fadef15';

const buildHistoryQueryBody = ({ candidateNumber }) => ({
  query: {
    columnFilter: {
      filters: [
        {
          column: 'Candidate #',
          operator: 'EQ',
          keyword: `${candidateNumber}`,
        },
      ],
      filtersJoinOperator: 'AND',
    },
    globalColumnFilterJoinOperator: 'OR',
    sort: {
      age: 'asc',
    },
    pagination: {
      startRow: 1,
      rowCount: 50,
    },
    sendRowIdsInResponse: true,
    showColumnNamesInResponse: true,
  },
});

const buildGridUrl = gridId => `${BASE_BP_GRID_URL}/grid/${gridId}/search`;

export async function fetchAuthId() {
  const response = await fetch(BASE_BP_LOGIN_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(LOGIN_CREDENTIALS),
  });
  return response.json();
}

export async function fetchHistory({ authId, gridId, candidateNumber }) {
  console.log({ authId });
  const response = await fetch(buildGridUrl(gridId), {
    method: 'POST',
    headers: {
      authId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildHistoryQueryBody({ candidateNumber, gridId })),
  });
  return response.json();
}

// TODO implement error handling best practices here
export async function getAndCombineCandidateHistory({
  authId,
  candidateNumber,
}) {
  // fetch users message history
  const messagesResponse = await fetchHistory({
    authId,
    gridId: MESSAGES_GRID_ID,
    candidateNumber,
  });

  const callHistoryResponse = await fetchHistory({
    authId,
    gridId: CALL_GRID_ID,
    candidateNumber,
  });

  const combinedSortedHistory = messagesResponse.rows
    .concat(callHistoryResponse.rows)
    .map(call => {
      const Timestamp = new Date(call.Timestamp);
      return { ...call, Timestamp };
    })
    .sort((a, b) => b.Timestamp - a.Timestamp);

  return combinedSortedHistory;
  // .error(() =>
  //   fetchAuthId()
  //     .then(() => getAndCombineCandidateHistory({ authId, candidateNumber }))
  //     // eslint-disable-next-line no-alert
  //     .error(alert('could not retrieve auth id for message history'))
  // )
  // .then(messagesResponse => {
  //   const callsResponse = fetchHistory({
  //     authId,
  //     gridId: CALL_GRID_ID,
  //     candidateNumber,
  //   });
  //   return { messagesResponse, callsResponse };
  // });

  // error: refetch authId, refetch message history
  // fetch users call history
  // combine the two arrays
  // sort by date
}
