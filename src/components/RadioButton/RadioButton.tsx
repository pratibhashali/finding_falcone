import { Vehicle } from 'finding_falcone_app/src/services/modules/vehicles';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export type RadioButtonOption = {
  name: string;
  value: string | number;
};
interface RadioButtonProps {
  options: Vehicle[];
  // eslint-disable-next-line react/require-default-props
  selectedOption?: Vehicle;
  onSelectOption: (option: Vehicle) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <View>
      {options.map(option => (
        <TouchableOpacity
          key={option.name}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => onSelectOption(option)}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: selectedOption === option ? 'blue' : 'gray',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedOption?.name === option.name && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: 'blue',
                }}
              />
            )}
          </View>
          <Text style={{ marginLeft: 8 }}>{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
