'use server';

import { revalidatePath } from 'next/cache';

export default async function createReviewAction(_: any, formData: FormData) {
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();
  const movieId = formData.get('movieId')?.toString();

  if (!content || !author || !movieId) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요',
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({
          movieId,
          content,
          author,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    revalidatePath(`/movie/${movieId}`);
  } catch (e) {
    console.error(e);
    return {
      status: false,
      error: `리뷰 저장 실패 : ${e}`,
    };
  }
}
