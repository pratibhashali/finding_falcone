import { api } from '../../api';

export type Token = {
  token: string;
};

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchToken: build.query<Token, {}>({
      query: () => 'token',
    }),
  }),
  overrideExisting: false,
});

export const { useLazyFetchTokenQuery } = userApi;
