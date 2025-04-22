import { MovieData, ReviewData } from '@/types';
import style from './page.module.css';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';
import Image from 'next/image';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`);
  if (!res.ok) {
    return [];
  }
  const allMovies: MovieData[] = await res.json();

  return allMovies.map((movie) => ({ id: String(movie.id) }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`
  );
  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const movie: MovieData = await res.json();

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
        className={style.cover_img_container}
      >
        <Image src={posterImgUrl} width={230} height={350} alt={`${title}`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.info}>
        {releaseDate} / {genres.join(', ')} / {runtime}분
      </div>
      <div className={style.company}>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );
  if (!res.ok) {
    throw new Error(`Review fetch failed: ${res.statusText}`);
  }
  const reviews: ReviewData[] = await res.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`
  );
  if (!res.ok) {
    return [];
  }
  const movie: MovieData = await res.json();

  return {
    title: `${movie.title} - 한입 시네마`,
    description: `${movie.description}`,
    openGraph: {
      title: `${movie.title} - 한입 시네마`,
      description: `${movie.description}`,
      images: [movie.posterImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <MovieDetail movieId={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
