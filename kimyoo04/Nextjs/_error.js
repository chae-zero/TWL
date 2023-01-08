// pages/500.js
// export default function Custom500() {
//   return <h1>500 - Server-side error occurred</h1>
// }

// 클라이언트와 서버 측 모두 에러 처리하는 방법
// _error.js는 프로덕션 모드에서만 사용됨.
// 개발 모드에선 오류가 발생하여 오류 발생 위치 알 수 있음
function Error({statusCode}) {
  return (
    <p>
      {statusCode
        ? `An Error ${statusCode} occurred on server`
        : "An error occurred on clinet"}
    </p>
  );
}

Error.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {statusCode};
};

export default Error;

```js
// 에러 페이지 재사용 방법
import Error from 'next/error'

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const errorCode = res.ok ? false : res.status
  const json = await res.json()

  return {
    props: { errorCode, stars: json.stargazers_count },
  }
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return <div>Next stars: {stars}</div>
}
```;
