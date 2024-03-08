import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Navigation';
import type {Movie} from '../../../core/entities/movie.entity';

interface MoviePosterProps {
  movie: Movie;
  height?: number;
  width?: number;
}

export default function MoviePoster({
  movie,
  height = 420,
  width = 300,
}: MoviePosterProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Details', {movieId: movie.id})}
      style={({pressed}) => ({
        ...styles.pressable,
        width,
        height,
        opacity: pressed ? 0.9 : 1,
      })}>
      <View
        style={{
          ...styles.imageContainer,
          height,
          width,
        }}>
        <Image source={{uri: movie.poster}} style={styles.image} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 5,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },

  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
  },

  image: {
    flex: 1,
    borderRadius: 18,
  },
});
