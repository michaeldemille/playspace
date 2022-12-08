import { creds } from 'creds/creds';

// to try this out you'll need to setup and use your unsplash api creds
// @ https://unsplash.com/oauth/applications and create a free test app.
export const environment = {
  production: false,
  unsplash: creds.unsplash,
};
