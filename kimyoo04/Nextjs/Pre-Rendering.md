# Pre-Rendering

1. first request -> return pre-rendered page (good for SEO)
2. Hydrate with React code Once Loaded
3. interactive working
4.

## two methods for pre-rendering

- static generation
- server-side rendering

## Hydration 이란?

- 직역은 수분 보충. 메마른 html, css 코드에 js 코드를 매칭 시켜 동적인 웹브라우저에 랜더링 하는 기술
- 실제로 클라이언트 측 JS가 실행되고 이벤트 핸들러가 첨부 될 때까지 입력에 응답 불가
- - React v18에서 HTML Streaming & 점진적 Hydration 으로 변경

* https://velog.io/@huurray/React-Hydration-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC
