import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

import {useMovies} from '../../hooks/useMovies';
import PosterCarrousel from '../../components/movies/PosterCarrousel';

export default function HomeScreen() {
  const {top} = useSafeAreaInsets();

  const {isLoading, nowPlaying} = useMovies();

  if (isLoading) {
    return (
      <View
        style={{
          ...styles.container,
          marginTop: styles.container.marginTop + top,
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View
        style={{
          ...styles.container,
          marginTop: styles.container.marginTop + top,
        }}>
        <PosterCarrousel movies={nowPlaying} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 10,
  },
});
