## lib/db.js

```js
// mongodb
import {MongoClient} from "mongodb";

function connectToDatabase() {
  const client = MongoClient.connect(".....................");
  return client;
}
```

## signup.js <- api

```js
export default async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const {name, email, phone, address, password} = data;

  if (
    !name ||
    !email ||
    !email.include("@") ||
    !phone ||
    !address ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({message: "Fail signup"});
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();
  const existingUser = db.collection("users").findOne({email});
  if (existingUser) {
    client.close();
    res.status(422).json({message: "User already exists!"});
    return;
  }

  const hashedPassword = await hashPassword(password); // 비밀번호 헤시화
  const result = await db.collection("users").insertOne({
    name,
    email,
    phone,
    address,
    password: hashedPassword,
  });

  client.close();
  res.status(201).json({message: "Success signup"});
  return;
};
```

## Signup.js <- component

```js
export default function Signup() {
  const router = useRouter();

  // react-hook-form을 통해 {name, email, phone, address, password} 값 받기

  Axios.post("api/signup", {name, email, phone, address, password}).then(
    (res) => {
      if (res.status === 200) {
        router.push("/signin");
      }
    }
  );
}
```
