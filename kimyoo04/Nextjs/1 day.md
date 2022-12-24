# nextjs

- https://nextjs.org/docs/basic-features/pages
- fullstack framework
- SSR 지원
- admin 페이지 외에 공개적인 페이지는 SEO 필요
- pre-rendering으로 filker 현상 제거
- CSR SSR 혼합 가능
- 파일 기반 라우팅 (nested routes, dynamic routes, dynamic parameters)
  boilerplate code

### 시작

- yarn create next-app -> Y -> project name
- yarn run dev

## File-based Routing

- /pages/index.js -> domain.com/
- /pages/about.js -> domain.com/about/
- /pages/products/index.js -> domain.com/products/
- /pages/products/item.js -> domain.com/products/item/ <- nested routes
- /pages/products/[id].js -> domain.com/products/1 <- dynamic routes
- /pages/post/[pid]/[comment].js -> domain.com/post/abc/a-comment -> router.query => { "pid": "abc", "comment": "a-comment" }
- /pages/post/[pid].js -> domain.com/post/abc?foo=bar -> router.query => { "foo": "bar", "pid": "abc" }
- /pages/blog/[...slug].js -> domain.com/blog/2020/12 -> router.query => { "slug": ["2020", "12"] } <- catch all routes

## folders

- pages: file-based routing
- public: static files (경로설정 시 public 빼고 경로 설정하기)

## nextjs v13

- Link 테그 안에 a 테그를 넣을 필요 없음.
- rust 기반 turbopack 배포 번들링 툴 새로 만듬.
- app(), use(), fetch()
- app 폴더로 라우팅, index.ts 대신 page.ts로 바꿔야함. (index.ts, some.tsx 접근불가)
- app 폴더의 layout, loading, error, template, head는 예약된 파일 명으로 특정 기능 구현에 사용
- app 폴더는 Server Component로 된다. -> 클라이언트가 받는 js 파일 사이즈가 줄어듬.
- Image 테그 alt 속성 필요로 바뀜
- font Layout Shift 방지
- 구글 폰트 내장 import { Inter } from "@next/font/google";
- import localFont from "@next/font/local";
- 링크 첨부시 나타나는 이미지OG Image
  import { ImageResponse } from "@vercel/og";
- middlewares rewrite와 redirect 사용할 필요 없고 바로 response 반환
