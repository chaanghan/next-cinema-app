'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import style from './searchbar.module.css';

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
      <div className={style.searchbar_container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요.."
          onChange={onChangeKeyword}
          value={keyword}
          onKeyDown={onKeyDown}
        />
        <button onClick={onClick}>검색</button>
      </div>
    </div>
  );
}
