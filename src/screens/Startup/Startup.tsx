import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { setDefaultTheme } from '../../store/theme';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { useLazyFetchPlanetQuery } from 'finding_falcone_app/src/services/modules/planets';
import { useLazyFetchVehicleQuery } from 'finding_falcone_app/src/services/modules/vehicles';
import Lottie from 'lottie-react-native';
const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters } = useTheme();

  const [
    fetchPlanet,
    {
      isSuccess: isPlanetSuccess,
      isLoading: isPlanetLoading,
      isFetching: isPlanetFetching,
    },
  ] = useLazyFetchPlanetQuery();

  const [
    fetchVehicle,
    {
      isSuccess: isVehicleSuccess,
      isLoading: isVehicleLoading,
      isFetching: isVehicleFetching,
    },
  ] = useLazyFetchVehicleQuery();

  const init = async () => {
    //Initially loading the planet and vehicles
    fetchPlanet({});
    fetchVehicle({});

    await setDefaultTheme({ theme: 'default', darkMode: null });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // Navigating to main page from Splash Screen
    if (isPlanetSuccess && isVehicleSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
    //TODO: Handle failure

    return () => {};
  }, [isPlanetSuccess, isVehicleSuccess]);

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
