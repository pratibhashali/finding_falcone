import { Planet } from 'finding_falcone_app/src/services/modules/planets';
import { Vehicle } from 'finding_falcone_app/src/services/modules/vehicles';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type RadioButtonOption = {
  name: string;
  value: string | number;
};
interface RadioButtonProps {
  options: Vehicle[];
  // eslint-disable-next-line react/require-default-props
  selectedOption?: Vehicle;
  onSelectOption: (option: Vehicle) => void;
  selectedPlanet: Planet;
  vehicleCountMapper: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedOption,
  onSelectOption,
  selectedPlanet,
  vehicleCountMapper,
}) => {
  const checkEligibility = (planet: Planet, vehicle: Vehicle) => {
    return (
      vehicle.max_distance < planet.distance ||
      vehicleCountMapper[vehicle.name] === 0
    );
  };
  return (
    <View>
      {options.map(option => (
        <TouchableOpacity
          key={option.name}
          style={styles.touchableOpacity}
          onPress={() => onSelectOption(option)}
          disabled={checkEligibility(selectedPlanet, option)}
        >
          <View
            style={[
              styles.rootView,
              { borderColor: selectedOption === option ? 'blue' : 'gray' },
            ]}
          >
            {selectedOption?.name === option.name && (
              <View style={[styles.selected]} />
            )}
          </View>
          <Text
            style={[
              styles.spaceLeft,
              {
                color: !checkEligibility(selectedPlanet, option)
                  ? 'black'
                  : 'grey',
              },
            ]}
          >
            {option.name} (
            {selectedOption && selectedOption.name === option.name
              ? vehicleCountMapper[selectedOption.name] - 1 < 0
                ? 0
                : vehicleCountMapper[selectedOption.name] - 1
              : vehicleCountMapper[option.name]}
            )
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rootView: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
  },
  spaceLeft: { marginLeft: 10 },
});
