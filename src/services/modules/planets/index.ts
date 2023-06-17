import { api } from '../../api';

export type Planet = {
  name: string;
  distance: number;
};

export const planetApi = api.injectEndpoints({
  endpoints: build => ({
    //TODO: Look into empty params get request
    fetchPlanet: build.query<Planet[], {}>({
      query: () => 'planets',
    }),
  }),
});

export const { useLazyFetchPlanetQuery } = planetApi;
