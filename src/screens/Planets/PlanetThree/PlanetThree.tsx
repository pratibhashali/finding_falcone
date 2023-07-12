import { StyleSheet, Text, View } from 'react-native';
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
import { Routes } from 'finding_falcone_app/src/navigators/Routes';
import { useTranslation } from 'react-i18next';

const PlanetThree = ({ navigation }) => {
  const { t } = useTranslation(['findFalcone', 'common']);
  const { Layout, Gutters } = useTheme();
  const { data: vehicleData } = useFetchVehicleQuery({});
  const dispatch = useDispatch();
  const {
    timeTaken3,
    planet3,
    spaceShip3,
    selectPlanetThreeDropDownData,
    vehicleCountMapper3,
  } = useSelector((state: RootState) => state.findFalcone);
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

  const onReset = () => navigation.navigate(Routes.WELCOME);
  const onNext = () => navigation.navigate(Routes.PLANET_FOUR);

  return (
    <View style={[Layout.fill, Gutters.smallPadding, styles.viewBg]}>
      <Text style={[Gutters.smallVMargin]}>
        {t('findFalcone:planetThree.select')}
      </Text>
      <>
        <DropdownComponent
          data={selectPlanetThreeDropDownData!}
          onChange={onDestination3Selected}
          label={t('common:planet')}
          placeholder={t('findFalcone:planetThree.dropdownPlaceHolder')}
          value={planet3}
          disabled={false}
        />
        {planet3 && (
          <>
            <Text style={[Gutters.largeTMargin]}>
              {t('common:selectVehicle')}
            </Text>
            <RadioButton
              vehicleCountMapper={vehicleCountMapper3}
              selectedPlanet={planet3}
              options={vehicleData!}
              selectedOption={spaceShip3}
              onSelectOption={onVehicle3Selected}
            />
          </>
        )}

        <TimeAndButton
          disabled={!(spaceShip3 && planet3)}
          onReset={onReset}
          onSubmit={onNext}
          timeTaken={timeTaken3}
          buttonText={t('common:selectNextPlanet')}
        />
      </>
    </View>
  );
};

export default PlanetThree;

const styles = StyleSheet.create({
  viewBg: { backgroundColor: '#EFEFEF' },
});
