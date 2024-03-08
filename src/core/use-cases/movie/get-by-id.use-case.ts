import type {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {FullMovieResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import type {FullMovie} from '../../entities/movie.entity';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<FullMovieResponse>(`/${movieId}`);
    return MovieMapper.fromMovieDBMovieToEntity(movie);
  } catch (error) {
    throw new Error(`Cannot get movie by id: ${movieId}`);
  }
};
