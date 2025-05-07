import { getUserCount } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';

const User = () => {
  const [count, setCount] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        const snapshot = await getUserCount();

        if (snapshot === null) {
          setError('사용자 인증이 필요합니다.');
        } else {
          setCount(snapshot?.data().count);
        }
      } catch (err) {
        console.error(err);
        setError('사용자 데이터를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);
  console.log(count);
  return (
    <div>
      <h2>총 사용자</h2>
      <div>{count}명</div>
    </div>
  );
};

export default User;
