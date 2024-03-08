import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import MoviePoster from './MoviePoster';
import type {Movie} from '../../../core/entities/movie.entity';

interface HorizontalCarouselProps {
  movies: Movie[];
  title?: string;
  loadNextPage?: () => void;
}

export default function HorizontalCarousel({
  movies,
  title,
  loadNextPage,
}: HorizontalCarouselProps) {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) {
      return;
    }

    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    const isEnd =
      contentOffset.x + 600 >= contentSize.width - layoutMeasurement.width;

    if (!isEnd) {
      return;
    }

    isLoading.current = true;

    loadNextPage?.();
  };

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: title ? 260 : 220,
      }}>
      {title && <Text style={styles.title}>{title}</Text>}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={movies}
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        onScroll={onScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 10,
    marginBottom: 10,
  },
});
