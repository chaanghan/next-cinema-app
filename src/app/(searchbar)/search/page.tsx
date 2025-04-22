import MovieItem from '@/components/MovieItem';
import style from './page.module.css';
import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import { Metadata } from 'next';

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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q}: 한입 시네마 검색`,
    description: `${q}의 검색 결과`,
    openGraph: {
      title: `${q}: 한입 시네마 검색`,
      description: `${q}의 검색 결과`,
      images: ['/thumbnail.png'],
    },
  };
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
