import { Auth } from 'aws-amplify';

export const fetchWrapper = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  await Auth.currentSession()
    .then((data) => {
      localStorage.setItem('idToken', data.getIdToken().getJwtToken());
    })
    .catch((err) => console.log('Current session error', err));
  return fetch(input, init);
};
