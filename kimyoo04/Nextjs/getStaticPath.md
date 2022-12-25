## getStaticPaths

- dynamic route는 얼마나 많은 페이지들이 생성되는지 모르기 때문에 pre-render 불가능 -> getStaticPaths, getStaticProps 같이 사용

```js
export async function getStaticPaths() {
  return {
    paths: [
      {params: {pid: "p1"}},
      {params: {pid: "p2"}},
      {params: {pid: "p3"}},
    ],
    fallback: false,
  };
}
```

- which instances of this dynamic page should be generated
- return 값은 형식을 지키기 [{}]
- home으로 갔을 때 prefetch를 통해 json파일들이 로드되어있다.
- fallback이 true이면, prefetch가 안된 페이지도 방문시에 fetch가 되어 그 다음 방문부터 prefetch를 이용
- - url로 직접 접근한다면 에러가 뜬다.
- - useEffect 처럼 작동 (클라이언트가 요청 후 data fetching 과정 시작, 로딩 페이지 필요)
- fallback이 "blocking"이면, 요청한 페이지가 완전히 pre-rendering이 될 때까지 기존페이지를 유지

```js
// data 유무 따라 path 자동 설정
export async function getStaticPaths() {
  // const data = await axios.get(`https://localholst:3000/products`)
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const paramsWithParams = ids.map((id) => ({params: {pid: id}}));

  return {
    paths: paramsWithParams,
    fallback: "blocking",
  };
}
```
