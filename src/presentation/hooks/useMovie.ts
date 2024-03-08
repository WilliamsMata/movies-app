import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import type {FullMovie} from '../../core/entities/movie.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieResponse = await UseCases.getMovieByIdUseCase(
          movieDBFetcher,
          movieId,
        );
        setMovie(movieResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovie();
  }, [movieId]);

  return {
    isLoading,
    movie,
  };
};
