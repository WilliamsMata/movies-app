import {useEffect, useState} from 'react';

import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import type {Movie} from '../../core/entities/movie.entity';

interface MoviesState {
  nowPlaying: Movie[];
  upcoming: Movie[];
  popular: Movie[];
  topRated: Movie[];
}

const INITIAL_MOVIES__STATE: MoviesState = {
  nowPlaying: [],
  upcoming: [],
  popular: [],
  topRated: [],
};

let popularPage = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<MoviesState>(INITIAL_MOVIES__STATE);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      const [nowPlayingMovies, upcomingMovies, popularMovies, topRatedMovies] =
        await Promise.all([
          UseCases.moviesNowPlayingUseCase(movieDBFetcher),
          UseCases.moviesUpcomingUseCase(movieDBFetcher),
          UseCases.moviesPopularUseCase(movieDBFetcher),
          UseCases.moviesTopRaredUseCase(movieDBFetcher),
        ]);

      setMovies({
        nowPlaying: nowPlayingMovies,
        upcoming: upcomingMovies,
        popular: popularMovies,
        topRated: topRatedMovies,
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPopularNextPage = async () => {
    try {
      popularPage += 1;

      const newPopularMovies = await UseCases.moviesPopularUseCase(
        movieDBFetcher,
        {page: popularPage},
      );

      setMovies(prevState => ({
        ...prevState,
        popular: [...prevState.popular, ...newPopularMovies],
      }));
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    // State
    isLoading,
    ...movies,

    // Methods
    loadPopularNextPage,
  };
};
