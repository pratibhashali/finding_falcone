import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import DropdownComponent from 'finding_falcone_app/src/components/Dropdown/Dropdown';
import RadioButton from 'finding_falcone_app/src/components/RadioButton/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'finding_falcone_app/src/store';
import { Planet } from 'finding_falcone_app/src/services/modules/planets';
import {
  planet4Selected,
  vehicle4Selected,
} from 'finding_falcone_app/src/store/findFalcone';
import {
  useFetchVehicleQuery,
  Vehicle,
} from 'finding_falcone_app/src/services/modules/vehicles';
import { useFindMutation } from 'finding_falcone_app/src/services/modules/find';
import { useTheme } from 'finding_falcone_app/src/hooks';
import TimeAndButton from 'finding_falcone_app/src/components/Buttons/TimeAndButton';
import { useFetchTokenMutation } from 'finding_falcone_app/src/services/modules/token';
import { Routes } from 'finding_falcone_app/src/navigators/Routes';

const PlanetFour = ({ navigation }) => {
  const { Layout, Gutters } = useTheme();
  const [fetchToken, {}] = useFetchTokenMutation({});
  const [find, {}] = useFindMutation({
    fixedCacheKey: 'shared-find-falcone',
  });
  const { data: vehicleData } = useFetchVehicleQuery({});
  const dispatch = useDispatch();
  const {
    timeTaken4,
    planet4,
    spaceShip4,
    selectPlanetFourDropDownData,
    planet1,
    spaceShip1,
    planet2,
    spaceShip2,
    planet3,
    spaceShip3,
    vehicleCountMapper4,
  } = useSelector((state: RootState) => state.findFalcone);
  const onDestination4Selected = useCallback(
    (item: Planet) => {
      dispatch(planet4Selected(item));
    },
    [dispatch, selectPlanetFourDropDownData],
  );

  const onVehicle4Selected = useCallback(
    (item: Vehicle) => {
      dispatch(vehicle4Selected(item));
    },
    [dispatch, vehicle4Selected],
  );
  const onReset = () => navigation.navigate(Routes.WELCOME);
  const onSubmit = async () => {
    try {
      const token = await fetchToken({}).unwrap();
      const payload = {
        token: token.token,
        planet_names: [
          planet1?.name,
          planet2?.name,
          planet3?.name,
          planet4?.name,
        ],
        vehicle_names: [
          spaceShip1?.name,
          spaceShip2?.name,
          spaceShip3?.name,
          spaceShip4?.name,
        ],
      };
      find(payload);
      navigation.navigate(Routes.RESULT);
    } catch (error) {}
  };

  return (
    <View style={[Layout.fill, Gutters.smallPadding, styles.root]}>
      <Text style={[Gutters.smallVMargin]}>
        Select the fourth planet you want to search in:
      </Text>
      <>
        <DropdownComponent
          data={selectPlanetFourDropDownData!}
          onChange={onDestination4Selected}
          label="Planet"
          placeholder="Select fourth planet"
          value={planet4}
          disabled={false}
        />
        {planet4 && (
          <>
            <Text style={[Gutters.largeTMargin]}>
              Select the space vehicle you want to use:
            </Text>
            <RadioButton
              vehicleCountMapper={vehicleCountMapper4}
              selectedPlanet={planet4}
              options={vehicleData!}
              selectedOption={spaceShip4}
              onSelectOption={onVehicle4Selected}
            />
          </>
        )}
        <TimeAndButton
          disabled={!(spaceShip4 && planet4)}
          onReset={onReset}
          onSubmit={onSubmit}
          timeTaken={timeTaken4}
          buttonText="Find Al Falcone"
        />
      </>
    </View>
  );
};

export default PlanetFour;

const styles = StyleSheet.create({
  root: { backgroundColor: '#EFEFEF' },
});
