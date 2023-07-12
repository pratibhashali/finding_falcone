import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import DropdownComponent from 'finding_falcone_app/src/components/Dropdown/Dropdown';
import RadioButton from 'finding_falcone_app/src/components/RadioButton/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'finding_falcone_app/src/store';
import { Planet } from 'finding_falcone_app/src/services/modules/planets';
import {
  planet2Selected,
  vehicle2Selected,
} from 'finding_falcone_app/src/store/findFalcone';
import {
  useFetchVehicleQuery,
  Vehicle,
} from 'finding_falcone_app/src/services/modules/vehicles';
import { useTheme } from 'finding_falcone_app/src/hooks';
import TimeAndButton from 'finding_falcone_app/src/components/Buttons/TimeAndButton';

const PlanetTwo = ({ navigation }) => {
  const { Layout, Gutters } = useTheme();
  const { data: vehicleData } = useFetchVehicleQuery({});
  const dispatch = useDispatch();
  const { timeTaken, planet2, spaceShip2, selectPlanetTwoDropDownData } =
    useSelector((state: RootState) => state.findFalcone);
  const onDestination2Selected = useCallback(
    (item: Planet) => {
      dispatch(planet2Selected(item));
    },
    [dispatch, selectPlanetTwoDropDownData],
  );

  const onVehicle2Selected = useCallback(
    (item: Vehicle) => {
      dispatch(vehicle2Selected(item));
    },
    [dispatch, vehicle2Selected],
  );

  return (
    <View style={[Layout.fill, Gutters.smallPadding, styles.viewBg]}>
      <Text style={[Gutters.smallVMargin]}>
        Select the second planet you want to search in:
      </Text>
      <>
        <DropdownComponent
          data={selectPlanetTwoDropDownData!}
          onChange={onDestination2Selected}
          label="Planet"
          placeholder="Select planet two"
          value={planet2}
          disabled={false}
        />
        {planet2 && (
          <>
            <Text style={[Gutters.largeTMargin]}>
              Select the space vehicle you want to use:
            </Text>
            <RadioButton
              selectedPlanet={planet2}
              options={vehicleData!}
              selectedOption={spaceShip2}
              onSelectOption={onVehicle2Selected}
            />
          </>
        )}

        <TimeAndButton
          disabled={!(spaceShip2 && planet2)}
          onReset={() => navigation.navigate('Welcome')}
          onSubmit={() => navigation.navigate('SelectPlanetThree')}
          timeTaken={timeTaken}
          buttonText="Select next planet"
        />
      </>
    </View>
  );
};

export default PlanetTwo;

const styles = StyleSheet.create({
  viewBg: { backgroundColor: '#EFEFEF' },
});
