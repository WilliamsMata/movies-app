import React from 'react';
import {Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import MovieHeader from '../../components/movie/MovieHeader';

interface DetailsScreenProps
  extends StackScreenProps<RootStackParamList, 'Details'> {}

export default function DetailsScreen({route}: DetailsScreenProps) {
  const {movieId} = route.params;

  const {isLoading, movie} = useMovie(movieId);

  if (isLoading || !movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {/* Headers */}
      <MovieHeader
        poster={movie.poster}
        originalTitle={movie.originalTitle}
        title={movie.title}
      />

      {/* Details */}
    </View>
  );
}
