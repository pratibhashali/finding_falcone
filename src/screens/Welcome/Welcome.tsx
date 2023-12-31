import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import { useTheme } from 'finding_falcone_app/src/hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { resetFindFalcone } from 'finding_falcone_app/src/store/findFalcone';
import { Routes } from 'finding_falcone_app/src/navigators/Routes';
import { useTranslation } from 'react-i18next';
const Welcome = ({ navigation }) => {
  const { t } = useTranslation(['welcome']);
  const { Layout } = useTheme();
  const dispatch = useDispatch();
  const onStartPress = () => {
    //Clear all the previous state
    dispatch(resetFindFalcone());
    navigation.push(Routes.HOME);
  };
  return (
    <View style={[Layout.fill]}>
      <View style={styles.root}>
        <Lottie
          source={require('../../animations/SpaceWalk.json')}
          autoPlay
          resizeMode="cover"
          hardwareAccelerationAndroid
          loop
        />
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.findButton} onPress={onStartPress}>
            <Text style={styles.buttonText}>{t('welcome:title')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});
