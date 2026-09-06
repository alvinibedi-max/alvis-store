import {json} from '@remix-run/node';

// Sourcing is an internal post-payment workflow. It is intentionally not exposed
// to browsers, because specialist evidence and supplier findings are private.
export const action = async () => {
  return json({error: 'Not found.'}, {status: 404});
};

export const loader = async () => {
  return json({error: 'Not found.'}, {status: 404});
};
