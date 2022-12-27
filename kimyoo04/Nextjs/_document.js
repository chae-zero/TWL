import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// app 폴더 바로 아래에만 위치할 것
// html document 전체를 수정 가능
// 클래스 기반 컴포넌트로 할 것
export default MyDocument;

// 기본 형태
// return (
//   <Html>
//     <Head />
//     <body>
//       <Main />
//       <NextScript />
//     </body>
//   </Html>
// );
