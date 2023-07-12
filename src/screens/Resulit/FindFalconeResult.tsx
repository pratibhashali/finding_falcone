import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useFindMutation } from 'finding_falcone_app/src/services/modules/find';
import { useSelector } from 'react-redux';
import { RootState } from 'finding_falcone_app/src/store';
import TimeTaken from 'finding_falcone_app/src/components/Time/TimeTaken';
import { useTheme } from 'finding_falcone_app/src/hooks';
import { Routes } from 'finding_falcone_app/src/navigators/Routes';
import { useTranslation } from 'react-i18next';

const FindFalconeResult = ({ navigation }) => {
  const [, { data, isLoading }] = useFindMutation({
    fixedCacheKey: 'shared-find-falcone',
  });
  const { t } = useTranslation(['findFalcone', 'common']);

  const { timeTaken4 } = useSelector((state: RootState) => state.findFalcone);
  const { Layout, Gutters } = useTheme();

  const onReset = () => navigation.navigate(Routes.WELCOME);

  const successView = () => (
    <>
      <Text style={styles.textCenter}>{t('findFalcone:result.success')}</Text>
      <Text style={styles.textCenter}>
        {'\n\n\n'}
        {t('findFalcone:result.planetFound')} {data?.planet_name}
      </Text>
      <View style={[Gutters.smallTMargin]}>
        <TimeTaken timeTaken={timeTaken4} />
      </View>
      <TouchableOpacity style={styles.tryMoreButton} onPress={onReset}>
        <Text style={styles.tryMoreText}>
          {t('findFalcone:result.playAgain')}
        </Text>
      </TouchableOpacity>
    </>
  );

  const getResultView = () => {
    if (data?.status === 'false') {
      return (
        <>
          <Text style={styles.textCenter}>
            {t('findFalcone:result.failed')}
          </Text>
          <View style={[Gutters.smallTMargin]}>
            <TimeTaken timeTaken={timeTaken4} />
          </View>
          <TouchableOpacity style={styles.tryMoreButton} onPress={onReset}>
            <Text style={styles.tryMoreText}>
              {t('findFalcone:result.oneMoreTime')}
            </Text>
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
      {!isLoading ? getResultView() : <ActivityIndicator size="large" />}
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
