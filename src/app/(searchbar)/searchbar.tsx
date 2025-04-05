'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Searchbar() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${keyword}`);
    }
  };
  const onClick = () => {
    router.push(`/search?q=${keyword}`);
  };
  return (
    <div>
      <input
        placeholder="검색어를 입력하세요.."
        value={keyword}
        onChange={onChangeKeyword}
        onKeyDown={onKeyDown}
      />
      <button onClick={onClick}>검색</button>
    </div>
  );
}
