import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import DropdownComponent from 'finding_falcone_app/src/components/Dropdown/Dropdown';
import RadioButton from 'finding_falcone_app/src/components/RadioButton/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'finding_falcone_app/src/store';
import { Planet } from 'finding_falcone_app/src/services/modules/planets';
import {
  planet3Selected,
  vehicle3Selected,
} from 'finding_falcone_app/src/store/findFalcone';
import {
  useFetchVehicleQuery,
  Vehicle,
} from 'finding_falcone_app/src/services/modules/vehicles';
import { useTheme } from 'finding_falcone_app/src/hooks';
import TimeAndButton from 'finding_falcone_app/src/components/Buttons/TimeAndButton';

const PlanetThree = ({ navigation }) => {
  const { Layout, Gutters } = useTheme();
  const { data: vehicleData } = useFetchVehicleQuery({});
  const dispatch = useDispatch();
  const { timeTaken, planet3, spaceShip3, selectPlanetThreeDropDownData } =
    useSelector((state: RootState) => state.findFalcone);
  const onDestination3Selected = useCallback(
    (item: Planet) => {
      dispatch(planet3Selected(item));
    },
    [dispatch, selectPlanetThreeDropDownData],
  );

  const onVehicle3Selected = useCallback(
    (item: Vehicle) => {
      dispatch(vehicle3Selected(item));
    },
    [dispatch, vehicle3Selected],
  );

  return (
    <View style={[Layout.fill, Gutters.smallPadding, styles.viewBg]}>
      <Text style={[Gutters.smallVMargin]}>
        Select the third planet you want to search in:
      </Text>
      <>
        <DropdownComponent
          data={selectPlanetThreeDropDownData!}
          onChange={onDestination3Selected}
          label="Planet"
          placeholder="Select third planet"
          value={planet3}
          disabled={false}
        />
        {planet3 && (
          <>
            <Text style={[Gutters.largeTMargin]}>
              Select the space vehicle you want to use:
            </Text>
            <RadioButton
              selectedPlanet={planet3}
              options={vehicleData!}
              selectedOption={spaceShip3}
              onSelectOption={onVehicle3Selected}
            />
          </>
        )}

        <TimeAndButton
          disabled={!(spaceShip3 && planet3)}
          onReset={() => navigation.navigate('Welcome')}
          onSubmit={() => navigation.navigate('SelectPlanetFour')}
          timeTaken={timeTaken}
          buttonText="Select next planet"
        />
      </>
    </View>
  );
};

export default PlanetThree;

const styles = StyleSheet.create({
  viewBg: { backgroundColor: '#EFEFEF' },
});
