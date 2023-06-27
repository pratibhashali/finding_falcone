import { api } from '../../api';

export type FindResponse = {
  planet_name?: string;
  status: string;
};

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    find: build.mutation<FindResponse, any>({
      query: requestBody => ({
        url: 'find',
        method: 'POST',
        body: requestBody,
        headers: {
          Accept: 'application/json',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useFindMutation } = userApi;
