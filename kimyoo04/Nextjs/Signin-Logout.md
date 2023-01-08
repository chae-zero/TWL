## signin.js <- api

```js
export default async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const {email, password} = data;

  if (
    !email ||
    !email.include("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({message: "Fail signin"});
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const user = db.collection("users").findOne({email});
  if (!user) {
    client.close();
    throw new Error("No user found");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    client.close();
    throw new Error("Not correct password");
  }

  client.close();
  res.setHeader("Set-Cookie", "a_name=Yoojacha;Max-age=3600;HttpOnly,Secure");
  res.status(200).json({message: "Success signin"});
  return;
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
  res.status(200).json({message: "Success logout"});
};
```

## Signin.js <- component

```js
export default function Signin() {
  const router = useRouter();

  // react-hook-form을 통해 email, password 값 받기

  Axios.post("api/signin", {email, password}).then((res) => {
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
