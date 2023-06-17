import { api } from '../../api';

export type Vehicle = {
  name: string;
  distance: number;
};

export const vehicleApi = api.injectEndpoints({
  endpoints: build => ({
    //TODO: Look into empty params get request
    fetchVehicle: build.query<Vehicle[], {}>({
      query: () => 'vehicles',
    }),
  }),
});

export const { useLazyFetchVehicleQuery } = vehicleApi;
