import { createSlice } from '@reduxjs/toolkit';

export type FindFalcone = {
  token: string;
  planet_names: string[];
  vehicle_names: string[];
};

export type FindFalconeResponseBase = {
  status: string;
  error?: string | any; // Not adding type assertion here, as error can be of multiple types
};

export interface FindFalconeResponse extends FindFalconeResponseBase {
  planet_name?: string;
}

const initialState: FindFalconeState = {
  findFalcone: {
    token: '',
    planet_names: [],
    vehicle_names: [],
  },
  findFalconeResponse: {
    status: '',
    planet_name: '',
    error: undefined,
  },
};

const findFalconeSlice = createSlice({
  name: 'findFalcone',
  initialState: initialState,
  reducers: {
    planetSelected: (state, { payload: { planet } }: PlanetPayload) => {
      state.findFalcone.planet_names.push(planet);
    },
    vehicleSelected: (state, { payload: { vehicle } }: VehiclePayload) => {
      state.findFalcone.vehicle_names.push(vehicle);
    },
    resetFindFalcone: state => {
      state.findFalcone = initialState.findFalcone;
      state.findFalconeResponse = initialState.findFalconeResponse;
    },
  },
});

export const { planetSelected, vehicleSelected, resetFindFalcone } =
  findFalconeSlice.actions;

export default findFalconeSlice.reducer;

export type FindFalconeState = {
  findFalcone: FindFalcone;
  findFalconeResponse?: FindFalconeResponse;
};

type PlanetPayload = {
  payload: {
    planet: string;
  };
};

type VehiclePayload = {
  payload: {
    vehicle: string;
  };
};
