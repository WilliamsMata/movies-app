import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

import {useMovies} from '../../hooks/useMovies';
import PosterCarousel from '../../components/movies/PosterCarousel';
import HorizontalCarousel from '../../components/movies/HorizontalCarousel';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

export default function HomeScreen() {
  const {top} = useSafeAreaInsets();

  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    loadPopularNextPage,
    loadTopRatedNextPage,
    loadUpcomingNextPage,
  } = useMovies();

  if (isLoading) {
    return <FullScreenLoader />;
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
        <HorizontalCarousel
          movies={topRated}
          title="Top Rated"
          loadNextPage={loadTopRatedNextPage}
        />

        {/* Upcoming */}
        <HorizontalCarousel
          movies={upcoming}
          title="Upcoming"
          loadNextPage={loadUpcomingNextPage}
        />
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
