import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import {
  Planet,
  useFetchPlanetQuery,
} from 'finding_falcone_app/src/services/modules/planets';
import { Dropdown } from 'react-native-element-dropdown';
import {
  useFetchVehicleQuery,
  Vehicle,
} from 'finding_falcone_app/src/services/modules/vehicles';
import DropdownComponent from 'finding_falcone_app/src/components/Dropdown/Dropdown';
import RadioButton, {
  RadioButtonOption,
} from 'finding_falcone_app/src/components/RadioButton/RadioButton';
import { useFetchTokenMutation } from 'finding_falcone_app/src/services/modules/token';
import { useFindMutation } from 'finding_falcone_app/src/services/modules/find';

const Example = () => {
  const { t } = useTranslation(['example', 'welcome']);
  const { Layout, Gutters } = useTheme();

  const [isFocus, setIsFocus] = useState(false);

  // const [fetchPlanet, { data, isLoading: isPlanetLoading }] =
  //   useLazyFetchPlanetQuery();
  // useEffect(() => {
  //   fetchPlanet({});
  // }, []);

  const {
    data: planetData,
    error: planetsError,
    isLoading: planetsLoading,
  } = useFetchPlanetQuery({});

  const {
    data: vehicleData,
    error: vehiclesError,
    isLoading: vehiclesLoading,
  } = useFetchVehicleQuery({});

  const [fetchToken, { isLoading }] = useFetchTokenMutation({});
  const [find, {}] = useFindMutation();
  const [pods, setPods] = useState<(string | null)[]>([null, null, null, null]);
  const [token, setToken] = useState<string>('');
  const init = async () => {
    try {
      const tokenr = await fetchToken({}).unwrap();
      setToken(tokenr.token.toString());
      console.log('🚀 ~ file: PlanetOne.tsx:55 ~ init ~ token:', token);
    } catch (error) {
      console.log('🚀 ~ file: PlanetOne.tsx:56 ~ init ~ error:', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const [planetData1, setPlanetData1] = useState<Planet[]>(planetData!);
  const [planetData2, setPlanetData2] = useState<Planet[]>(planetData!);
  const [planetData3, setPlanetData3] = useState<Planet[]>(planetData!);
  const [planetData4, setPlanetData4] = useState<Planet[]>(planetData!);

  const [destination1, setDestination1] = useState<Planet>();
  const [destination2, setDestination2] = useState<Planet>();
  const [destination3, setDestination3] = useState<Planet>();
  const [destination4, setDestination4] = useState<Planet>();

  const [planets, setPlanets] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const onDestination1Selected = (item: Planet) => {
    setDestination1(item);
    setDestination2(undefined);
    setDestination3(undefined);
    setDestination4(undefined);
    setPlanetData2(planetData1.filter(planet => planet.name !== item.name));
    // const planet = [item.name, ...planets];
    setPlanets([item.name, planets[1], planets[2], planets[3]]);
  };

  const onDestination2Selected = (item: Planet) => {
    setDestination2(item);
    setDestination3(undefined);
    setDestination4(undefined);
    setPlanetData3(planetData2.filter(planet => planet.name !== item.name));
    setPlanets([planets[0], item.name, planets[2], planets[3]]);
  };
  const onDestination3Selected = (item: Planet) => {
    setDestination3(item);
    setDestination4(undefined);
    setPlanetData4(planetData3.filter(planet => planet.name !== item.name));
    setPlanets([planets[0], planets[1], item.name, planets[3]]);
  };
  const onDestination4Selected = (item: Planet) => {
    setDestination4(item);
    setPlanets([planets[0], planets[1], planets[2], item.name]);
  };

  const [selectedOption1, setSelectedOption1] = useState<Vehicle>();

  const handleSelectOption1 = (option: Vehicle) => {
    setSelectedOption1(option);
  };

  const [selectedOption2, setSelectedOption2] = useState<Vehicle>();

  const handleSelectOption2 = (option: Vehicle) => {
    setSelectedOption2(option);
  };

  const [selectedOption3, setSelectedOption3] = useState<Vehicle>();

  const handleSelectOption3 = (option: Vehicle) => {
    setSelectedOption3(option);
  };

  const [selectedOption4, setSelectedOption4] = useState<Vehicle>();

  const handleSelectOption4 = (option: Vehicle) => {
    setSelectedOption4(option);
  };

  const onSubmit = () => {
    const payload = {
      token: token,
      planet_names: planets,
      vehicle_names: [
        selectedOption1?.name,
        selectedOption2?.name,
        selectedOption3?.name,
        selectedOption4?.name,
      ],
    };
    find(payload);
  };

  return (
    <ScrollView
      style={[Layout.fill, { backgroundColor: 'white' }]}
      contentContainerStyle={[
        Layout.fullSize,
        Layout.fill,
        Layout.scrollSpaceBetween,
        Gutters.smallPadding,
        ,
      ]}
    >
      <View style={[Layout.fill, { backgroundColor: 'white' }]}>
        {planetData && planetData.length > 0 && !planetsLoading ? (
          <>
            <DropdownComponent
              data={planetData1!}
              onChange={onDestination1Selected}
              label="Destination 1"
              placeholder="Select planet 1"
              value={destination1}
            />
            {destination1 && (
              <RadioButton
                options={vehicleData!}
                selectedOption={selectedOption1}
                onSelectOption={handleSelectOption1}
              />
            )}
            <DropdownComponent
              data={planetData2}
              disabled={!destination1}
              onChange={onDestination2Selected}
              label="Destination 2"
              placeholder="Select planet 2"
              value={destination2}
            />
            {destination2 && (
              <RadioButton
                options={vehicleData!}
                selectedOption={selectedOption2}
                onSelectOption={handleSelectOption2}
              />
            )}

            <DropdownComponent
              data={planetData3!}
              onChange={onDestination3Selected}
              disabled={!destination2}
              label="Destination 3"
              placeholder="Select planet 3"
              value={destination3}
            />
            {destination3 && (
              <RadioButton
                options={vehicleData!}
                selectedOption={selectedOption3}
                onSelectOption={handleSelectOption3}
              />
            )}
            <DropdownComponent
              data={planetData4!}
              disabled={!destination3}
              onChange={onDestination4Selected}
              label="Destination 4"
              placeholder="Select planet 4"
              value={destination4}
            />
            {destination4 && (
              <RadioButton
                options={vehicleData!}
                selectedOption={selectedOption4}
                onSelectOption={handleSelectOption4}
              />
            )}

            <Button title="Submit" onPress={onSubmit} />
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
