import React from 'react';
import {Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';

interface DetailsScreenProps
  extends StackScreenProps<RootStackParamList, 'Details'> {}

export default function DetailsScreen({route}: DetailsScreenProps) {
  const {movieId} = route.params;

  const {} = useMovie(movieId);

  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  );
}
