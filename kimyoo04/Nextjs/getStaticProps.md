## Static Generation

```js
export async function getStaticProps(context) {...}
```

- 빌드를 통해 서버사이드의 준비된 데이터와 함께 미리 생성된 페이지
- server / CDN 으로 준비되고, 캐시화 된다.
- code bundle에 포함되지 않는다. (클라이언트에 노출 방지)
- object를 반환해야함: {props: {...}}
- 컴포넌트가 실행되기 이전에 컴포넌트의 props를 준비해주는 비동기 함수
- 빌드를 통해 코드가 미리 실행되어 클라이언트 사이드에서 코드가 안보여지는 장점
- 서버에서 data fetching을 진행

### data 폴더의 json 이용

```js
import fs from "fs/promises"; // -> getStaticProps 함수 안에는 사용 가능
import path from "path";

function Home(props) {
  const {products} = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // const data = await axios.get(`https://localholst:3000/products`)
  const data = await getData(); // static data get
  return {
    props: {
      products: data.products,
    },
  };
}
```

## Incremental Static Regeneration (ISR)

```js
return {
  props: {
    products: data.products,
  },
  revalidate: 10, // 리랜더링 간격
};
```

- page regenerate every 10 second

## Not Found Page

```js
if (data.products.length === 0) {
  // 404 page 보여줄 지, 말 지
  return {
    notFound: true;
  }
}
```

## Redirect

```js
if (!data) {
  return {
    redirect: {
      destination: "/",
    },
  };
}
```

## context

```js
function Detail(props) {
  const {detailedProduct} = props;

  if (!detailedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{detailedProduct.title}</h1>
      <p>{detailedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const {params} = context;
  const productId = params.pid;
  // const data = await axios.get(`https://localholst:3000/products/${productId}`)
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  // 데이터 없을 때 404 페이지 로드
  if (!product) {
    return {notFound: true};
  }

  return {
    props: {
      detailProduct: product,
    },
  };
}
```

- get concrete value
- pre-render을 위한 params를 얻으려면 context 이용.
- 클라이언트 사이드에서 활용하려면 router.query 이용.
- dynamic route는 얼마나 많은 페이지들이 생성되는지 모르기 때문에 pre-render 불가능 -> getStaticPaths 같이 이용
