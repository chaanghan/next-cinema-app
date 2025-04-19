'use server';

export default async function createReviewAction(formData: FormData) {
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();
  const movieId = formData.get('movieId')?.toString();

  if (!content || !author || !movieId) {
    return;
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
    console.log(res.status);
  } catch (e) {
    console.error(e);
    return;
  }
}
