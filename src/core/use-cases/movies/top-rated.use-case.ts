import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {TMDBResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {Movie} from '../../entities/movie.entity';

export const moviesTopRaredUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<TMDBResponse>('/top_rated');

    return topRated.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error fetching top rated movies: ${error.message}`);
  }
};
