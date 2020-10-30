const BASE_BP_LOGIN_URL =
  'https://qa.bigparser.com/APIServices/api/common/login';

const BASE_BP_GRID_URL = 'https://qa.bigparser.com/api/v2';

const LOGIN_CREDENTIALS = {
  emailId: 'popeshealthcare@gmail.com',
  password: 'bHippojones*888',
  loggedIn: true,
};

const MESSAGES_GRID_ID = '5f9c15a994a030055fadeed8';

const buildMessageQueryBody = candidateNumber => ({
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
  },
});

const buildGridUrl = gridId => `${BASE_BP_GRID_URL}/grid/${gridId}/search`;

export async function fetchAuthId() {
  const response = await fetch(BASE_BP_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(LOGIN_CREDENTIALS),
  });
  return response.json();
}

export async function fetchMessageHistory({ authId }) {
  const response = await fetch(buildGridUrl(MESSAGES_GRID_ID), {
    method: 'POST',
    headers: {
      authId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildMessageQueryBody('')),
  });
  return response.json();
}

// export const getCallHistory = (gridId, senderNumber) =>
//   fetchAuthId().then(r => {
//     const { AuthId } = r;
//   });
// export const getMessageHistory = fetch();
