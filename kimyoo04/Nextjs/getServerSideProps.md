# Server-side Rendering

```js
export async function getServerSideProps() {...}
```

- 요청에 따라 계속 데이터가 바뀌는 페이지의 경우 사용
- 빌드시 작동하지 않고, 배포 후 서버에서 실행되거나 개발 서버에서 실행됨
- generate html at request time
- - user request -> next js -> fetch external data -> html generate -> send browser
- for fetching personalize data
- static generation은 느리기 때문에 필요할 때만 사용

```js
export async function getServerSideProps(context) {
  const {params, req, res} = context;

  return {
    props: {
      key: "value",
    },
  };
}
```

- context 안에 req, res 추가
- 실시간 데이터의 경우에 사용

```js
export async function getServerSideProps(context) {
  const {params, req, res, query} = context;
  console.log(query);
  console.log(req.headers.cookie);
  res.setHeader("Set-Cookie", ["name=Kim"]);
  const data = await getData();

  return {
    props: {
      products: data,
      category,
    },
  };
}
```
