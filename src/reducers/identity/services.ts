import { IdentityClient, Identity, Response } from '@appteam6/domoapps.js';

export const getAuthUser = async (): Promise<Identity> => {
  const { data: identity }: Response<Identity> = await IdentityClient.get();

  if (!identity.userId || !identity.userName) {
    throw new Error('Invalid user authentication');
  }

  return identity;
};
