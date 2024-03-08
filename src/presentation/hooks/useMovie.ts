import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import type {FullMovie} from '../../core/entities/movie.entity';
import type {Cast} from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const [movieResponse, castResponse] = await Promise.all([
          UseCases.getMovieByIdUseCase(movieDBFetcher, movieId),
          UseCases.getMovieCastUseCase(movieDBFetcher, movieId),
        ]);

        setMovie(movieResponse);
        setCast(castResponse);
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
    cast,
  };
};
