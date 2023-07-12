import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useFindMutation } from 'finding_falcone_app/src/services/modules/find';
import { useSelector } from 'react-redux';
import { RootState } from 'finding_falcone_app/src/store';
import TimeTaken from 'finding_falcone_app/src/components/Time/TimeTaken';
import { useTheme } from 'finding_falcone_app/src/hooks';

const FindFalconeResult = ({ navigation }) => {
  const [, { data }] = useFindMutation({
    fixedCacheKey: 'shared-find-falcone',
  });

  const { timeTaken } = useSelector((state: RootState) => state.findFalcone);
  const { Layout, Gutters } = useTheme();

  const onReset = () => navigation.navigate('Welcome');

  const successView = () => (
    <>
      <Text style={styles.textCenter}>
        Success! Congratulations on Finding Falcone King Shan is mightily
        pleased. {'\n\n\n'}Planet found: {data?.planet_name}
      </Text>
      <View style={[Gutters.smallTMargin]}>
        <TimeTaken timeTaken={timeTaken} />
      </View>
      <TouchableOpacity style={styles.tryMoreButton} onPress={onReset}>
        <Text style={styles.tryMoreText}>Play again</Text>
      </TouchableOpacity>
    </>
  );

  const getResultView = () => {
    if (data?.status === 'false') {
      return (
        <>
          <Text style={styles.textCenter}>
            Failure! On Finding Falcone King Shan is not pleased and gives you
            one more attempt
          </Text>
          <View style={[Gutters.smallTMargin]}>
            <TimeTaken timeTaken={timeTaken} />
          </View>
          <TouchableOpacity style={styles.tryMoreButton} onPress={onReset}>
            <Text style={styles.tryMoreText}>Try one more time</Text>
          </TouchableOpacity>
        </>
      );
    }
    if (data?.status === 'success') {
      return successView();
    }
  };
  return (
    <View style={[Layout.fill, Gutters.smallPadding, styles.root]}>
      {getResultView()}
    </View>
  );
};

export default FindFalconeResult;

const styles = StyleSheet.create({
  textCenter: { textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tryMoreButton: {
    height: 40,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  tryMoreText: {
    color: 'white',
  },
});
