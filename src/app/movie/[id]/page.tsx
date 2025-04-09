import style from './page.module.css';

const mockData = {
  id: 6,
  title: '존 윅',
  releaseDate: '2025-03-19',
  company: '(주)제이앤씨미디어그룹, 와이드 릴리즈㈜',
  genres: ['액션', '스릴러'],
  subTitle: '3월 19일 전설의 귀환',
  description:
    '전설이라 불리던 킬러 ‘존 윅’. 사랑하는 아내 ‘헬렌’과의 평화로운 삶도 잠시, 그녀의 죽음 이후 그에게는 아내가 남긴 강아지와 차 한 대만이 남는다. 어느 날, ‘존 윅’의 차를 노린 요제프 일당이 그의 차를 훔치고, 아내가 남긴 강아지마저 죽여버린다. 이에 분노한 ‘존 윅’은 자신의 모든 것을 앗아간 이들에게 복수하기 위해 지하에 파묻었던 총과 칼을 다시 꺼내드는데…',
  runtime: 101,
  posterImgUrl:
    'https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20250306_162%2F1741233401976TRBxt_JPEG%2Fmovie_image.jpg',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const { id } = await params;
  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = mockData;

  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
        className={style.cover_img_container}
      >
        <img src={posterImgUrl} />
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
