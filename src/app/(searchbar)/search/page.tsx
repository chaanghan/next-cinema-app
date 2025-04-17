import MovieItem from '@/components/MovieItem';
import style from './page.module.css';
import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: 'force-cache' }
  );
  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const movies: MovieData[] = await res.json();

  return (
    <div className={style.recommandMovie}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} recommand />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense
      key={q || ''}
      fallback={<div style={{ color: 'white' }}>Loading...</div>}
    >
      <SearchResult q={q} />
    </Suspense>
  );
}
