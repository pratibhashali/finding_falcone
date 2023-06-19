import { api } from '../../api';

export type Token = {
  token: string;
};

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchToken: build.mutation<Token, {}>({
      query: () => ({
        url: 'token',
        method: 'POST',
        body: {},
        headers: {
          Accept: 'application/json',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useFetchTokenMutation } = userApi;
