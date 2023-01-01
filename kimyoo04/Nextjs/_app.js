import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({Component, pageProps}) {
  return (
    <Layout>
      {/* 모든 페이지에 일괄 적용 */}
      {/* Head 테그가 2개 이상 있어도 merge 되면서 중복은 나중에 나온 것이 활성화 */}
      {/* key 속성으로 중복 피하기 */}
      <Head>
        <title>Next Events</title>
        <meta name="description" content="this is general description" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// app 폴더 바로 아래에만 위치할 것
