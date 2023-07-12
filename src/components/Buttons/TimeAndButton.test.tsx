import React from 'react';
import { render, screen } from '@testing-library/react-native';
import TimeAndButton from './TimeAndButton';
import { Provider } from 'react-redux';
import { store } from '../../store';

test('render correctly', () => {
  const component = (
    <Provider store={store}>
      <TimeAndButton
        timeTaken={240}
        buttonText="time and button"
        disabled={false}
        onSubmit={() => {}}
        onReset={() => {}}
      />
    </Provider>
  );

  render(component);
});
