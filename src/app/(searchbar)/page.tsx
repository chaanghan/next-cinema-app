import style from './Index.module.css';
import MovieItem from '@/components/MovieItem';
import { MovieData } from '@/types';
import { Metadata } from 'next';

async function RecoMovie() {
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

export const metadata: Metadata = {
  title: '한입 시네마',
  description: '한입 시네마에 등록된 영화를 만나보세요',
  openGraph: {
    title: '한입 시네마',
    description: '한입 시네마에 등록된 영화를 만나보세요',
    images: ['/thumbnail.png'],
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <RecoMovie />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
