import MovieItemSkeleton from './movie-item-skeleton';
import style from './movie-reco-skeleton.module.css';

export default function MovieRecoSkeleton({ count }: { count: number }) {
  return (
    <div className={style.container}>
      {new Array(count).fill(0).map((_, idx) => (
        <MovieItemSkeleton key={`movie-item-skeleton-${idx}`} />
      ))}
    </div>
  );
}
