import Link from "next/link";

const clients = [
  {id: "1", name: "kimkim"},
  {id: "2", name: "leelee"},
];

export function linkExamples() {
  return (
    <div>
      <h1>pages</h1>
      <ul>
        <li>
          {/* 일반 사용 */}
          <Link href="/about">About</Link>

          {/* 뒤로가기 불가 */}
          <Link replace href="/about">
            About
          </Link>

          {/* 링크 이동시 탑 스크롤 금지 */}
          <Link scroll={false}>no scroll</Link>

          {/* as를 통해 안보여주고 싶은 URL 숨기기 */}
          <Link as="/dashboard" href={path}>
            Dashboard
          </Link>

          {/* 함수형 컴포넌트가 child에 있을 때 
          - passHref를 하지 않으면 실제 a 테그에 href가 빠져 SEO에 안좋다.
          - legacyBehavior를 넣어야 Link의 child에 컴포넌트나 테그를 넣을 수 있다.
          you must wrap the component in React.forwardRef */}
          <Link href="/about" passHref legacyBehavior>
            <MyButton />
          </Link>

          {/* 다른 페이지의 소스를 미리 받아오는 동작 조절. false를 해도 마우스 hover 시 prefetcg 동작. production 모드만 작동. */}
          <Link prefetch={false}>prefetch</Link>

          {/* JSON 형태를 링크로 변환 */}
          {clients.map((client) => (
            <li key={client.id}>
              <Link href={`/clients/${client.id}`}>{client.name}</Link>
              {/* href에 객체 할당 */}
              <Link href={{pathname: "/client/[id]", query: {id: client.id}}}>
                {client.name}
              </Link>
            </li>
          ))}
        </li>
      </ul>
    </div>
  );
}

// 미들웨어를 통한 Link 분기처리
export function middleware(req) {
  const nextUrl = req.nextUrl;
  if (nextUrl.pathname === "/dashboard") {
    if (req.cookies.authToken) {
      return NextResponse.rewrite("/auth/dashboard");
    } else {
      return NextResponse.rewrite("/public/dashboard");
    }
  }
}
