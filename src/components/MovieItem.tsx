import { MovieData } from '@/types';
import Link from 'next/link';
import style from './MovieItem.module.css';
import Image from 'next/image';

export default function MovieItem({
  id,
  title,
  subTitle,
  description,
  releaseDate,
  company,
  genres,
  runtime,
  posterImgUrl,
  recommand,
}: MovieData & {
  recommand?: boolean;
}) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <Image
        src={posterImgUrl}
        width={300}
        height={450}
        layout="responsive"
        alt={`${title}`}
        className={`${style.container} ${recommand ? style.recommand : ''}`}
      />
    </Link>
  );
}
