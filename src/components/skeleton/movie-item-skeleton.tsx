import style from './movie-item-skeleton.module.css';

export default function MovieItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
    </div>
  );
}
