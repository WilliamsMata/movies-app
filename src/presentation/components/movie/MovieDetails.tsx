/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Formatter} from '../../../config/helpers/formatter';
import type {FullMovie} from '../../../core/entities/movie.entity';
import type {Cast} from '../../../core/entities/cast.entity';
import CastActor from '../cast/CastActor';

interface MovieDetailsProps {
  movie: FullMovie;
  cast: Cast[];
}

export default function MovieDetails({movie, cast}: MovieDetailsProps) {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text>{movie.rating}</Text>

          <Text style={{marginLeft: 5}}> - {movie.genres.join(', ')}</Text>
        </View>

        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Story
        </Text>

        <Text style={{fontSize: 16}}>{movie.description}</Text>

        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Budget
        </Text>

        <Text style={{fontSize: 18}}>{Formatter.currency(movie.budget)}</Text>
      </View>

      {/* Casting */}
      <View style={{marginBottom: 50, marginTop: 10}}>
        <Text
          style={{
            fontSize: 23,
            marginVertical: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Casting
        </Text>

        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <CastActor actor={item} />}
        />
      </View>
    </>
  );
}
