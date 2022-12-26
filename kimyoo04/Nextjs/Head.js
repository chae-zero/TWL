import Head from "next/head";

function App(props) {
  return (
    // 특정 페이지의 head 테그 삽입 방법
    <Head>
      <title>nextjs title</title>
      <meta name="description" content="this is a description test" />
    </Head>
  );
}
