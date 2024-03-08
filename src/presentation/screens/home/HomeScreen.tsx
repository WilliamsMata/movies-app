import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

import {useMovies} from '../../hooks/useMovies';
import PosterCarousel from '../../components/movies/PosterCarousel';
import HorizontalCarousel from '../../components/movies/HorizontalCarousel';

export default function HomeScreen() {
  const {top} = useSafeAreaInsets();

  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    loadPopularNextPage,
  } = useMovies();

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
        {/* Principal */}
        <PosterCarousel movies={nowPlaying} />

        {/* Popular */}
        <HorizontalCarousel
          movies={popular}
          title="Popular"
          loadNextPage={loadPopularNextPage}
        />

        {/* Top Rated */}
        <HorizontalCarousel movies={topRated} title="Top Rated" />

        {/* Upcoming */}
        <HorizontalCarousel movies={upcoming} title="Upcoming" />
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
