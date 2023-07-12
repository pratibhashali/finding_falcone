import { Linking, StyleSheet, Text } from 'react-native';
import React from 'react';

interface LinkProps {
  text: string;
  url: string;
}

const Link = ({ text, url }: LinkProps) => {
  return (
    <Text style={styles.padding} onPress={() => Linking.openURL(url)}>
      {text}
    </Text>
  );
};

export default Link;

const styles = StyleSheet.create({
  padding: { paddingEnd: 5 },
});
