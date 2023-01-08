// 기본구성
// const { data, error, isValidating, mutate } = useSWR(key, fetcher, options)

// The most beautiful thing is that there will be only 1 request sent to the API, because they use the same SWR key and the request is deduped, cached and shared automatically.

// 전역 설정
// <SWRConfig value={options}>
//   <Component />
// </SWRConfig>

// 설명 참고: https://velog.io/@soryeongk/SWRBasic

import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("http://localhost:3000/storage");
  const data = await response.json();
  return data;
};

export async function storageSWR() {
  const {data, error, isValidating} = useSWR("storage", fetcher);

  if (error) return <div>failed to load</div>;
  if (isValidating) return <div>loading...</div>;
  if (!data) return {notFound: true};

  return (
    <div>
      <h2>Storage</h2>
      <h3>posts</h3>
      <p>{data.posts}</p>
      <h3>followers</h3>
      <p>{data.followers}</p>
      <h3>followings</h3>
      <p>{data.followings}</p>
    </div>
  );
}

// custom hook
export function useUser(id) {
  const {data, error} = useSWR(`/api/user/${id}`, fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function UserAvatar() {
  const {user, isLoading, isError} = useUser();
  if (isError) return <Error />;
  if (isLoading) return <Spinner />;
  return <img src={user.avatar} alt={user.name} />;
}
