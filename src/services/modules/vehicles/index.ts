import { api } from '../../api';

export type Vehicle = {
  name: string;
  total_no: number;
  max_distance: number;
  speed: number;
};

export const vehicleApi = api.injectEndpoints({
  endpoints: build => ({
    //TODO: Look into empty params get request
    fetchVehicle: build.query<Vehicle[], {}>({
      query: () => 'vehicles',
    }),
  }),
});

export const { useFetchVehicleQuery } = vehicleApi;
