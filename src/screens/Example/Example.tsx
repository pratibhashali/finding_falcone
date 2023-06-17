import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import {
  Planet,
  useLazyFetchPlanetQuery,
} from 'finding_falcone_app/src/services/modules/planets';
import { Dropdown } from 'react-native-element-dropdown';

const Example = () => {
  const { t } = useTranslation(['example', 'welcome']);
  const { Layout } = useTheme();

  const [isFocus, setIsFocus] = useState(false);

  const [fetchPlanet, { data, isLoading: isPlanetLoading }] =
    useLazyFetchPlanetQuery();
  useEffect(() => {
    fetchPlanet({});
  }, []);

  const [value, setValue] = useState<Planet>();

  const renderDropDownLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Select planet
        </Text>
      );
    }
    return null;
  };

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fullSize,
        Layout.fill,
        Layout.scrollSpaceBetween,
      ]}
    >
      <View style={[Layout.fill, { backgroundColor: 'white' }]}>
        {renderDropDownLabel()}
        {data && data.length > 0 && !isPlanetLoading ? (
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="name"
            valueField="distance"
            placeholder={!isFocus ? 'Select planet' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item);
              setIsFocus(false);
            }}
          />
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
