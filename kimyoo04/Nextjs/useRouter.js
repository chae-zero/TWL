import {useRouter} from "next/router";

function app() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  // 현재 url의 쿼리 값 받아오기
  const {uid} = router.query;

  // router를 활용한 url 이동 방법
  function example1() {
    router.push({
      pathname: "/client/[id]/[clientprojectid]",
      query: {id: "2", clientprojectid: "lalal"},
    });
  }
  function example2() {
    router.replace({
      pathname: "/client/[id]/[clientprojectid]",
      query: {id: "2", clientprojectid: "lalal"},
    });
  }

  // 로딩 중에 UI 설정
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>router pathname : {router.pathname}</h1>
      <h1>router query : {router.query}</h1>
    </div>
  );
}

export default app;
