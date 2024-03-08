import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import type {Movie} from '../../../core/entities/movie.entity';
import MoviePoster from './MoviePoster';

interface PosterCarrouselProps {
  movies: Movie[];
  height?: number;
}

export default function PosterCarrousel({
  movies,
  height = 440,
}: PosterCarrouselProps) {
  return (
    <View style={{height}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
}
