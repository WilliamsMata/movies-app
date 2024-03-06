import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {NowPlayingResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import type {Movie} from '../../entities/movie.entity';

export const moviesNowPlayingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');

    console.log({nowPlaying});

    return nowPlaying.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
    }));
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error fetching now playing movies: ${error.message}`);
  }
};
