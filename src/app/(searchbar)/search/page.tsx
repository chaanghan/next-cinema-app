import MovieItem from '@/components/MovieItem';
import movies from '../../../dummy.json';
import style from './page.module.css';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className={style.recommandMovie}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} recommand />
      ))}
    </div>
  );
}
