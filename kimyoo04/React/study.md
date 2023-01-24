## 리액트는 가상돔을 사용한다.

- 웹 페이지 빌드 과정 (Critical Rendering Path, CRP)
- 인터렉션에 의해 DOM에 변화가 생기면 render tree가 재생성된다.
- DOM을 조작하는 비용이 너무 커진다. -> Virtual DOM

## Virtual DOM

- 메모리에 DOM을 복사해둔 것
- 이전의 가상 돔과 이번에 바뀐 가상 돔을 비교(Diffing)하여 바뀐 부분만 실제 돔에 적용시킨다.(Reconciliation)
- 돔 조작 비용 감소

## CRA 설정

- 웹팩과 바벨을 설정해준다.
- 웹팩 - 오픈소스 자바스크립트 모듈 번들러. 여러개로 나누어진 파일들을 하나의 자바스크립트로 압축, 최적화 해주는 라이브러리 -> 로딩할 때 네트워크 비용 감소, 가독성과 유지보수 용이
- 바벨 - 최신 자바스크립트 문법을 구형 브라우저들에서 작동하게 변환시켜주는 라이브러리

## SPA, Single Page Application

- 웹사이트 전체 페이지를 하나의 페이지에 담아 동적으로 화면을 바꿔가며 표현
- id가 root 인 div 태그 안에 담는다.
- SPA에서는 페이지 전환(브라우징)을 HTML 5의 history API 사용해서 가능하게 만든다. (routing 라이브러리를 통해)
- ex) History.back(), History.forward(), History.go(), History.pushState(), History.replaceState()

## JSX (JavaScript Syntax Extension)

- 자바스크립트의 확장 문법
- 자바스크립트와 HTML을 같이 사용할 수 있음 -> UI를 직접적으로 수정 및 이벤트 처리 구현 용이
- 바벨이 알아서 코드를 자동적으로 고쳐준다. (변환과정을 굳이 알필요는 없다.)

## key 속성 쓰는 이유

- 가상 돔을 이용해 바뀐 부분을 찾아 실제 돔에 수정을 가할 때 key 를 이용해서 추적을 하기 때문에 필요!
- 인덱스를 넣어주는 것은 좋지 않다. -> 키값이 겹치게 되는 경우 문제가 생긴다.
- map을 하기 위한 json형태로 id 키의 값을 두고 활용하는 것이 좋다.

## React Hooks 란?

- 클래스 컴포넌트의 문제점을 해결하기 위함
- 함수형 컴포넌트는 코드가 짧아져 심플해지고 빠른 성능을 가지고 있다.
- 함수형 컴포넌트는 React의 생명주기를 활용을 하지 못하는 단점을 hooks 가 해결

## React 생명주기

- Mounting: componentDidMount
- Updaing: componentDidUpdate
- Unmounting: componentWillUnmount

  -> useEffect hook 을 예로 들면 componentDidMount, componentDidUpdate, componentWillUnmount 를 한번에 처리해주면서 코드가 더 간결해지고 직관적이가 되었다.

## HOC 컴포넌트

- HOC 란? High Order component. 컴포넌트를 인자로 받아서 새로운 리액트 컴포넌트를 리턴하는 함수
- HOC 컴포넌트를 Custom React Hooks 로 대체해서 많은 Wrapper HOC 컴포넌트를 줄이게 된다.
