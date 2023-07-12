import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from 'finding_falcone_app/src/services/modules/planets';
import { Vehicle } from 'finding_falcone_app/src/services/modules/vehicles';

export type FindFalcone = {
  token: string;
  planet_names: (string | undefined)[];
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
  token: '',
  planet1: undefined,
  planet2: undefined,
  planet3: undefined,
  planet4: undefined,
  spaceShip1: undefined,
  spaceShip2: undefined,
  spaceShip3: undefined,
  spaceShip4: undefined,
  selectPlanetOneDropDownData: [],
  selectPlanetTwoDropDownData: [],
  selectPlanetThreeDropDownData: [],
  selectPlanetFourDropDownData: [],
  timeTaken1: 0,
  timeTaken2: 0,
  timeTaken3: 0,
  timeTaken4: 0,
  vehicleCountMapper1: {},
  vehicleCountMapper2: {},
  vehicleCountMapper3: {},
  vehicleCountMapper4: {},
};

const findFalconeSlice = createSlice({
  name: 'findFalcone',
  initialState: initialState,
  reducers: {
    planet1Selected: (state, action: PayloadAction<Planet>) => {
      state.planet1 = action.payload;
      state.planet2 = undefined;
      state.planet3 = undefined;
      state.planet4 = undefined;
      // Removing the selected planet from second page dropdown
      state.selectPlanetTwoDropDownData =
        state.selectPlanetOneDropDownData.filter(
          planet => planet.name !== action.payload.name,
        );
      //Removing selected spaceships as well as planet is modified
      state.spaceShip1 = undefined;
      state.spaceShip2 = undefined;
      state.spaceShip3 = undefined;
      state.spaceShip4 = undefined;
    },
    planet2Selected: (state, action: PayloadAction<Planet>) => {
      state.planet2 = action.payload;
      state.planet3 = undefined;
      state.planet4 = undefined;
      // Removing the selected planet from third page dropdown
      state.selectPlanetThreeDropDownData =
        state.selectPlanetTwoDropDownData.filter(
          planet => planet.name !== action.payload.name,
        );
      //Removing selected spaceships as well as planet is modified
      state.spaceShip2 = undefined;
      state.spaceShip3 = undefined;
      state.spaceShip4 = undefined;
    },
    planet3Selected: (state, action: PayloadAction<Planet>) => {
      state.planet3 = action.payload;
      state.planet4 = undefined;
      // Removing the selected planet from fourth page dropdown
      state.selectPlanetFourDropDownData =
        state.selectPlanetThreeDropDownData.filter(
          planet => planet.name !== action.payload.name,
        );
      //Removing selected spaceships as well as planet is modified
      state.spaceShip3 = undefined;
      state.spaceShip4 = undefined;
    },
    planet4Selected: (state, action: PayloadAction<Planet>) => {
      state.planet4 = action.payload;
    },

    vehicle1Selected: (state, action: PayloadAction<Vehicle>) => {
      state.spaceShip1 = action.payload;
      const timeTaken = (state.planet1?.distance ?? 0) / action.payload.speed;
      state.timeTaken1 = timeTaken;
      state.timeTaken2 = timeTaken;
      state.planet2 = undefined;
      state.planet3 = undefined;
      state.planet4 = undefined;

      // Updating remaining vehicle count
      const vehicleCountMapper2 = { ...state.vehicleCountMapper1 };
      vehicleCountMapper2[action.payload.name] -= 1;
      state.vehicleCountMapper2 = vehicleCountMapper2;
    },
    vehicle2Selected: (state, action: PayloadAction<Vehicle>) => {
      state.spaceShip2 = action.payload;
      const timeTaken2 =
        (state.planet2?.distance ?? 0) / action.payload.speed +
        state.timeTaken1;
      state.timeTaken2 = timeTaken2;
      state.timeTaken3 = timeTaken2;
      state.planet3 = undefined;
      state.planet4 = undefined;

      // Updating remaining vehicle count
      const vehicleCountMapper3 = { ...state.vehicleCountMapper2 };
      vehicleCountMapper3[action.payload.name] -= 1;
      state.vehicleCountMapper3 = vehicleCountMapper3;
    },
    vehicle3Selected: (state, action: PayloadAction<Vehicle>) => {
      state.spaceShip3 = action.payload;
      const timeTaken3 =
        (state.planet3?.distance ?? 0) / action.payload.speed +
        state.timeTaken2 +
        state.timeTaken1;
      state.timeTaken3 = timeTaken3;
      state.timeTaken4 = timeTaken3;
      state.planet4 = undefined;
      // Updating remaining vehicle count
      const vehicleCountMapper4 = { ...state.vehicleCountMapper3 };
      vehicleCountMapper4[action.payload.name] -= 1;
      state.vehicleCountMapper4 = vehicleCountMapper4;
    },
    vehicle4Selected: (state, action: PayloadAction<Vehicle>) => {
      state.spaceShip4 = action.payload;
      state.timeTaken4 =
        (state.planet4?.distance ?? 0) / action.payload.speed +
        state.timeTaken3 +
        state.timeTaken2 +
        state.timeTaken1;
    },
    selectPlanetOneDropDownData: (state, action: PayloadAction<Planet[]>) => {
      state.selectPlanetOneDropDownData = action.payload;
    },

    resetFindFalcone: state => {
      state.spaceShip1 = undefined;
      state.spaceShip2 = undefined;
      state.spaceShip3 = undefined;
      state.spaceShip4 = undefined;
      state.planet1 = undefined;
      state.planet2 = undefined;
      state.planet3 = undefined;
      state.planet4 = undefined;
      state.timeTaken1 = 0;
      state.timeTaken2 = 0;
      state.timeTaken3 = 0;
      state.timeTaken4 = 0;
      state.vehicleCountMapper2 = {};
      state.vehicleCountMapper3 = {};
      state.vehicleCountMapper4 = {};
    },
    setToken: (state, { payload: { token } }: TokenPayload) => {
      state.token = token;
    },

    setVehicleMap: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicleCountMapper1 = action.payload.reduce((object: any, item) => {
        object[item.name] = item.total_no;
        return object;
      }, {});
    },
  },
});

export const {
  planet1Selected,
  vehicle1Selected,
  planet2Selected,
  vehicle2Selected,
  planet3Selected,
  vehicle3Selected,
  planet4Selected,
  vehicle4Selected,
  resetFindFalcone,
  setToken,
  selectPlanetOneDropDownData,
  setVehicleMap,
} = findFalconeSlice.actions;

export default findFalconeSlice.reducer;

export type FindFalconeState = {
  findFalcone: FindFalcone;
  findFalconeResponse?: FindFalconeResponse;
  token?: string;
  planet1?: Planet;
  planet2?: Planet;
  planet3?: Planet;
  planet4?: Planet;
  spaceShip1?: Vehicle;
  spaceShip2?: Vehicle;
  spaceShip3?: Vehicle;
  spaceShip4?: Vehicle;
  selectPlanetOneDropDownData: Planet[];
  selectPlanetTwoDropDownData: Planet[];
  selectPlanetThreeDropDownData: Planet[];
  selectPlanetFourDropDownData: Planet[];
  timeTaken1: number;
  timeTaken2: number;
  timeTaken3: number;
  timeTaken4: number;
  vehicleCountMapper1?: any;
  vehicleCountMapper2?: any;
  vehicleCountMapper3?: any;
  vehicleCountMapper4?: any;
};

type TokenPayload = {
  payload: {
    token: string;
  };
};
