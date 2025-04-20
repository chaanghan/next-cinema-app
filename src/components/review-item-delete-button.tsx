'use client';

import { useActionState, useEffect, useRef } from 'react';
import style from './review-item-delete-button.module.css';
import { deleteReviewAction } from '@/actions/delete-review';

export default function ReviewItemDeleteButton({
  movieId,
  reviewId,
}: {
  movieId: number;
  reviewId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <input name="movieId" value={movieId} hidden readOnly />
      <input name="reviewId" value={reviewId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div
          onClick={() => formRef.current?.requestSubmit()}
          className={style.deleteBtn}
        >
          🗑️ 리뷰 삭제하기
        </div>
      )}
    </form>
  );
}
