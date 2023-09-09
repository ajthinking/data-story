import { Client } from '@hubspot/api-client';

export const hubspot = new Client({
  accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
  numberOfApiCallRetries: 3,
})
