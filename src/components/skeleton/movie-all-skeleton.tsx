import MovieListSkeleton from './movie-list-skeleton';
import style from './movie-all-skeleton.module.css';

export default function MovieAllSkeleton({ count }: { count: number }) {
  return (
    <div className={style.container}>
      {new Array(count).fill(0).map((_, idx) => (
        <MovieListSkeleton key={`movie-item-skeleton-${idx}`} />
      ))}
    </div>
  );
}
