import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import { useTheme } from 'finding_falcone_app/src/hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Welcome = ({ navigation }) => {
  const { Layout, Gutters } = useTheme();
  return (
    <View style={[Layout.fill]}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Lottie
          source={require('../../animations/SpaceWalk.json')}
          autoPlay
          resizeMode="cover"
          hardwareAccelerationAndroid
          loop
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            onPress={() => navigation.push('Home')}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
              }}
            >
              Help King Shan find Al Falcone.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
