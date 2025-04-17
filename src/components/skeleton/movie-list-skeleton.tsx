import style from './movie-list-skeleton.module.css';

export default function MovieListSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
    </div>
  );
}
