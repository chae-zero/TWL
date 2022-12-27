# Image Component

- webp 파일 변환 및 용량 절약
- 누적 레이아웃 이동 방지 (Prevent Cumulative Layout Shift, CLS)
- lazy loading - 화면에 보여질 때 로드함
- css의 width height는 적용되고, Image테그의 width와 height는 이미지 크기 조절임
- require() 문법 사용 불가

```js
import Image from "next/image";

function loaderFunction({src, width, quality}) {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
}

function App() {
  return (
    <>
      <Image
        // loader={loaderFunction} // 원격 파일의 사이즈, 퀄리티 조절
        src={"/"}
        alt={"name"}
        width={250} // automatically provided
        height={160} // automatically provided
        // quality={100} // 이미지 퀄리티 정도, 1~100, default는 75
        // blurDataURL="data:..." automatically provided
        // placeholder="blur"
        // priority // 랜더링 순서를 앞당김, disabling lazy-loading
        // Optional // blur-up while loading
        // layout={'fill'} // 부모태그에 적용
      />
    </>
  );
}

export default App;
```

## Advanced Props

- style: css 적용
- onLoadingComplete: 로딩 끝난 후 작동하는 callback function
- onLoad: 이미지가 로드 될 때 작동하는 callback function
- onError: 이미지 로드 실패할 때 작동하는 callback function
- loading: 성능상의 문제로 사용하지말 것
- blurDataURL: placeholder 용 이미지를 위한 Data URL
