import React from 'react';
import {ScrollView} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import MovieHeader from '../../components/movie/MovieHeader';
import MovieDetails from '../../components/movie/MovieDetails';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

interface DetailsScreenProps
  extends StackScreenProps<RootStackParamList, 'Details'> {}

export default function DetailsScreen({route}: DetailsScreenProps) {
  const {movieId} = route.params;

  const {isLoading, movie, cast} = useMovie(movieId);

  if (isLoading || !movie) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      {/* Headers */}
      <MovieHeader
        poster={movie.poster}
        originalTitle={movie.originalTitle}
        title={movie.title}
      />

      {/* Details */}
      <MovieDetails movie={movie} cast={cast} />
    </ScrollView>
  );
}
