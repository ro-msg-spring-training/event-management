import { Auth } from 'aws-amplify';

export const fetchWrapper = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  await Auth.currentSession()
    .then((data) => {
      localStorage.setItem('idToken', data.getIdToken().getJwtToken());
    })
    // .catch();

  return fetch(input, init);
};
