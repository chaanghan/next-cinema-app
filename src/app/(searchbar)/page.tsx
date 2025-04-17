import MovieItemSkeleton from '@/components/skeleton/movie-item-skeleton';
import style from './Index.module.css';
import MovieItem from '@/components/MovieItem';
import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';
import MovieRecoSkeleton from '@/components/skeleton/movie-reco-skeleton';
import MovieAllSkeleton from '@/components/skeleton/movie-all-skeleton';

async function RecoMovie() {
  await delay(3000);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 10 } }
  );
  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const movies: MovieData[] = await res.json();

  return (
    <div className={style.recommandMovie}>
      {movies.slice(0, 3).map((movie) => (
        <MovieItem key={movie.id} {...movie} recommand />
      ))}
    </div>
  );
}

async function AllMovies() {
  await delay(1500);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {
    cache: 'force-cache',
  });
  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const movies: MovieData[] = await res.json();

  return (
    <div className={style.allMovie}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
export const dynamic = 'force-dynamic';
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense
          fallback={
            <>
              <MovieRecoSkeleton count={3} />
            </>
          }
        >
          <RecoMovie />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense
          fallback={
            <>
              <MovieAllSkeleton count={18} />
            </>
          }
        >
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
