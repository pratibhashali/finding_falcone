import { StyleSheet, Text, View } from 'react-native';
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
import { Routes } from 'finding_falcone_app/src/navigators/Routes';
import { useTranslation } from 'react-i18next';

const PlanetTwo = ({ navigation }) => {
  const { Layout, Gutters } = useTheme();
  const { t } = useTranslation(['findFalcone', 'common']);
  const { data: vehicleData } = useFetchVehicleQuery({});
  const dispatch = useDispatch();
  const {
    timeTaken2,
    planet2,
    spaceShip2,
    selectPlanetTwoDropDownData,
    vehicleCountMapper2,
  } = useSelector((state: RootState) => state.findFalcone);
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
  const onReset = () => navigation.navigate(Routes.WELCOME);
  const onNext = () => navigation.navigate(Routes.PLANET_THREE);

  return (
    <View style={[Layout.fill, Gutters.smallPadding, styles.viewBg]}>
      <Text style={[Gutters.smallVMargin]}>
        {t('findFalcone:planetTwo.select')}
      </Text>
      <>
        <DropdownComponent
          data={selectPlanetTwoDropDownData!}
          onChange={onDestination2Selected}
          label={t('common:planet')}
          placeholder={t('findFalcone:planetTwo.dropdownPlaceHolder')}
          value={planet2}
          disabled={false}
        />
        {planet2 && (
          <>
            <Text style={[Gutters.largeTMargin]}>
              {t('common:selectVehicle')}
            </Text>
            <RadioButton
              vehicleCountMapper={vehicleCountMapper2}
              selectedPlanet={planet2}
              options={vehicleData!}
              selectedOption={spaceShip2}
              onSelectOption={onVehicle2Selected}
            />
          </>
        )}

        <TimeAndButton
          disabled={!(spaceShip2 && planet2)}
          onReset={onReset}
          onSubmit={onNext}
          timeTaken={timeTaken2}
          buttonText={t('common:selectNextPlanet')}
        />
      </>
    </View>
  );
};

export default PlanetTwo;

const styles = StyleSheet.create({
  viewBg: { backgroundColor: '#EFEFEF' },
});
