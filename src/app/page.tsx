import { ClientCredentials, ModuleOptions } from 'simple-oauth2'

import { Dashboard } from './dashboard';

//Set the config for the OAuth2 client
const config: ModuleOptions<"client_id"> = {
  client: {
    id: process.env.CLIENT_ID ?? '',
    secret: process.env.CLIENT_SECRET ?? ''
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST ?? '',
    tokenPath: process.env.TOKEN_PATH ?? ''
  }
}

//Create the OAuth2 client
const oauth2Client = new ClientCredentials(config)

export default async function Home() {
  //Get a token using the client credentials
  const res = await oauth2Client.getToken({});

  const accessToken = res.token['access_token'] as string

  return (
    <Dashboard accessToken={accessToken} />
  );
}