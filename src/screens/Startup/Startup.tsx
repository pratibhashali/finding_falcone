import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { useFetchPlanetQuery } from 'finding_falcone_app/src/services/modules/planets';
import { useFetchVehicleQuery } from 'finding_falcone_app/src/services/modules/vehicles';
import Lottie from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { selectPlanetOneDropDownData } from 'finding_falcone_app/src/store/findFalcone';
const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout } = useTheme();

  const { data: planetData } = useFetchPlanetQuery({});

  const { data: vehicleData } = useFetchVehicleQuery({});

  const dispatch = useDispatch();

  useEffect(() => {
    // Navigating to main page from Splash Screen
    if (planetData && vehicleData) {
      dispatch(selectPlanetOneDropDownData(planetData));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
    //TODO: Handle failure

    return () => {};
  }, [vehicleData, planetData]);

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <View style={styles.animationView}>
        <Lottie
          source={require('../../animations/SpacePlanet.json')}
          autoPlay
          hardwareAccelerationAndroid
          loop
        />
      </View>

      <Text style={styles.loadingText}>Loading the Planets and Vehicles</Text>
    </View>
  );
};

export default Startup;

const styles = StyleSheet.create({
  animationView: { flex: 5, height: 400, width: 400 },
  loadingText: {
    justifyContent: 'flex-end',
    verticalAlign: 'bottom',
    flex: 2,
  },
});
