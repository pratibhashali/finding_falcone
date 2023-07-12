import { useTheme } from 'finding_falcone_app/src/hooks';
import { Planet } from 'finding_falcone_app/src/services/modules/planets';
import { Colors } from 'finding_falcone_app/src/theme/themes/default_dark/Variables';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface DropdownComponentProps {
  data: Planet[];
  label: string;
  placeholder: string;
  onChange: (value: Planet) => void;
  value: string | Planet | null | undefined;
  disabled: boolean;
}

const DropdownComponent: React.FC<DropdownComponentProps> = React.memo(
  ({ data, label, placeholder, onChange, value, disabled }) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={[isFocus && { color: 'blue' }]}>{label}</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={!isFocus ? placeholder : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
          disable={disabled}
        />
      </View>
    );
  },
);

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
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
