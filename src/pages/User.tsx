import { getUserCount } from '@/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { FiUser, FiUsers } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';

type UserProfile = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
};

const User = () => {
  const [count, setCount] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        setCurrentUser(null);
      }
    });

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

    return () => unsubscribe();
  }, []);

  if (loading)
    return <div className="p-6 text-center text-gray-500">로딩 중...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-[var(--card-bg)] text-[var(--text)] rounded-2xl shadow-md border border-[var(--card-border)]">
      {/* 총 사용자 수 */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2 text-[var(--text)]">
          <FiUsers className="w-6 h-6 text-[var(--accent-blue)]" />
          현재 어플 총 사용자
        </h2>
        <p className="mt-2 text-4xl font-bold text-[var(--accent-blue)]">
          {count}명
        </p>
      </div>

      {/* 현재 사용자 */}
      <div>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-[var(--card-border)] flex items-center gap-2">
          <FiUser className="w-5 h-5 text-[var(--icon-color)]" />
          현재 사용자
        </h2>

        {currentUser ? (
          <div className="flex items-center gap-4">
            {/* 프로필 이미지 또는 첫 글자 */}
            <div className="w-16 h-16 rounded-full border border-[var(--card-border)] overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="프로필"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-2xl text-gray-600 dark:text-gray-300 font-bold">
                  {currentUser.displayName?.charAt(0).toUpperCase() || '?'}
                </span>
              )}
            </div>

            {/* 사용자 정보 */}
            <div>
              <p className="text-lg font-medium">
                {currentUser.displayName || '이름 없음'}
              </p>
              <p className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <HiOutlineMail className="w-4 h-4" />
                {currentUser.email}
              </p>
              <p className="text-xs mt-1 text-gray-400">
                UID: {currentUser.uid}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-300">
              로그인되지 않았습니다
            </p>
            <button className="mt-3 px-4 py-2 bg-[var(--accent-blue)] text-white rounded-lg hover:bg-blue-700 transition">
              로그인하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
