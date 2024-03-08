import type {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import type {MovieDBCastResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {CastMapper} from '../../../infrastructure/mappers/cast.mapper';
import type {Cast} from '../../entities/cast.entity';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Cast[]> => {
  try {
    const {cast} = await fetcher.get<MovieDBCastResponse>(
      `/movie/${movieId}/credits`,
    );

    const actors = cast.map(CastMapper.fromMovieDbCastToEntity);
    return actors;
  } catch (error) {
    throw new Error(`Error getting movie cast, movieId: ${movieId}`);
  }
};
