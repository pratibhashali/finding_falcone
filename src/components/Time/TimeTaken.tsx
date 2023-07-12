import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import React from 'react';

interface TimeTakenProps {
  timeTaken: number;
  textStyle?: StyleProp<TextStyle>;
}
const TimeTaken = ({ timeTaken, textStyle }: TimeTakenProps) => {
  return (
    <Text style={[styles.timeText, textStyle]}>Time taken: {timeTaken}</Text>
  );
};

TimeTaken.defaultProps = {
  textStyle: undefined,
};
export default TimeTaken;

const styles = StyleSheet.create({
  timeText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
