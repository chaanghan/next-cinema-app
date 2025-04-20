'use server';

import { delay } from '@/util/delay';
import { revalidatePath } from 'next/cache';

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString();
  const movieId = formData.get('movieId')?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: '삭제할 리뷰가 없습니다',
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: 'DELETE',
      }
    );
    revalidatePath(`/review/${movieId}`);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return {
      status: true,
      error: '',
    };
  } catch (e) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다 : ${e}`,
    };
  }
}
