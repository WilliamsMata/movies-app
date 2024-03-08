import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MoviePoster from './MoviePoster';
import type {Movie} from '../../../core/entities/movie.entity';

interface HorizontalCarouselProps {
  movies: Movie[];
  title?: string;
}

export default function HorizontalCarousel({
  movies,
  title,
}: HorizontalCarouselProps) {
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
