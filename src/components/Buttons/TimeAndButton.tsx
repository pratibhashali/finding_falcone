import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import TimeTaken from '../Time/TimeTaken';

interface ButtonsProps {
  timeTaken: number;
  buttonText: string;
  disabled: boolean;
  onSubmit: () => void;
  onReset: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Buttons: FC<ButtonsProps> = ({
  timeTaken,
  buttonText,
  disabled,
  onSubmit,
  onReset,
  containerStyle,
}) => {
  const { t } = useTranslation(['common']);
  return (
    <View style={[styles.container, containerStyle]}>
      <TimeTaken timeTaken={timeTaken} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={onReset}
        >
          <Text style={styles.buttonText}>{t('common:reset')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.findButton,
            disabled && styles.disabledButton,
          ]}
          disabled={disabled}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Buttons.defaultProps = {
  containerStyle: undefined,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 40,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: 'red',
  },
  findButton: {
    backgroundColor: 'black',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
  },
});

export default Buttons;
