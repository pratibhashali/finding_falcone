import React, { useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../hooks';
import { Planet } from 'finding_falcone_app/src/services/modules/planets';
import {
  useFetchVehicleQuery,
  Vehicle,
} from 'finding_falcone_app/src/services/modules/vehicles';
import DropdownComponent from 'finding_falcone_app/src/components/Dropdown/Dropdown';
import RadioButton from 'finding_falcone_app/src/components/RadioButton/RadioButton';
import {
  planet1Selected,
  vehicle1Selected,
} from 'finding_falcone_app/src/store/findFalcone';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'finding_falcone_app/src/store';
import TimeAndButton from 'finding_falcone_app/src/components/Buttons/TimeAndButton';
import { Routes } from 'finding_falcone_app/src/navigators/Routes';
import { useTranslation } from 'react-i18next';
// import { useAppDispatch } from 'finding_falcone_app/src/store';

const Example = ({ navigation }) => {
  const { Layout, Gutters } = useTheme();
  const { t } = useTranslation(['findFalcone', 'common']);

  const { data: vehicleData } = useFetchVehicleQuery({});

  const dispatch = useDispatch();

  const {
    planet1,
    spaceShip1,
    selectPlanetOneDropDownData,
    timeTaken1,
    vehicleCountMapper1,
  } = useSelector((state: RootState) => state.findFalcone);
  const onDestination1Selected = useCallback(
    (item: Planet) => {
      dispatch(planet1Selected(item));
    },
    [dispatch, selectPlanetOneDropDownData],
  );

  const onVehicle1Selected = useCallback(
    (item: Vehicle) => {
      dispatch(vehicle1Selected(item));
    },
    [dispatch, vehicle1Selected],
  );

  const onReset = () => navigation.navigate(Routes.WELCOME);
  const onNext = () => navigation.navigate(Routes.PLANET_TWO);

  return (
    <ScrollView
      style={[Layout.fill, styles.viewBg]}
      contentContainerStyle={[
        Layout.fullSize,
        Layout.fill,
        Layout.scrollSpaceBetween,
        Gutters.smallPadding,
      ]}
    >
      <View style={[Layout.fill, styles.viewBg]}>
        {selectPlanetOneDropDownData &&
        selectPlanetOneDropDownData.length > 0 ? (
          <>
            <Text style={[Gutters.smallVMargin]}>
              {t('findFalcone:planetOne.select')}
            </Text>
            <DropdownComponent
              data={selectPlanetOneDropDownData!}
              onChange={onDestination1Selected}
              label={t('common:planet')}
              placeholder={t('findFalcone:planetOne.dropdownPlaceHolder')}
              value={planet1}
              disabled={false}
            />
            {planet1 && (
              <>
                <Text style={[Gutters.largeTMargin]}>
                  {t('common:selectVehicle')}
                </Text>
                <RadioButton
                  vehicleCountMapper={vehicleCountMapper1}
                  selectedPlanet={planet1}
                  options={vehicleData!}
                  selectedOption={spaceShip1}
                  onSelectOption={onVehicle1Selected}
                />
              </>
            )}

            <TimeAndButton
              disabled={!(spaceShip1 && planet1)}
              onReset={onReset}
              onSubmit={onNext}
              timeTaken={timeTaken1}
              buttonText={t('common:selectNextPlanet')}
            />
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ScrollView>
  );
};

export default Example;

const styles = StyleSheet.create({
  viewBg: { backgroundColor: '#EFEFEF' },
});
