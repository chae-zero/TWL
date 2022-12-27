## signin.js <- api

```js
export default (req, res) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", "a_name=Yoojacha;Max-age=3600;HttpOnly,Secure");
    res.status(200).json({message: "ok"});
  }
};
```

## isSignin.js <- api

```js
export default (req, res) => {
  res.status(200).json({name: req.cookies.a_name});
};
```

## logout.js <- api

```js
export default (req, res) => {
  // Max-age를 0으로
  res.setHeader("Set-Cookie", "a_name=Yoojacha;Max-age=0;HttpOnly,Secure");
  res.status(200).json({message: "ok"});
};
```

## signin.js <- component

```js
export default function Signin() {
  const router = useRouter();

  Axios.post("api/signin").then((res) => {
    if (res.status === 200) {
      router.push("/");
    }
  });
}
```

## DashBoard.js <- component

```js
export default function Dashboard() {
  const router = useRouter();
  const [isSignin, setIsSignin] = useState(false);

  function isAuthenticate() {
    Axios.get("/api/isSignin").then((res) => {
      if (res.status === 200 && res.data.name) {
        setIsSignin(true);
      } else {
        setIsSignin(false);
        router.push("/Signin");
      }
    });
  }

  function logout() {
    Axios.get("/api/logout").then((res) => {
      if (res.status === 200) {
        router.push("/");
      }
    });
  }

  useEffect(() => {
    isAuthenticate();
  });

  return (
    <>
      {isSignin ? <Button>로그아웃</Button> : <Button>로그인</Button>}
      {isSignin ? <Storage /> : null}
    </>
  );
}
```
