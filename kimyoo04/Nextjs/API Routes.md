# API Routes

- 폴더명을 api로 할 것
- 코드는 노출되지 않음
- express.js와 유사
-

```js
function handler(req, res) {
  if (req.method === "POST") {
    const {email, name, address} = req.body;

    const newFeedback = {
      email,
      name,
      address,
    };

    res.status(201).json({message: "success", feedback: newFeedback});
  }

  if (req.method === "GET") {
    // get data code here

    res.status(200).json({feedback: data});
  }
}

export default handler;
```

## Dynamic API Routes

```js
// pages/api/post/[pid].js

export default function handler(req, res) {
  const {pid} = req.query;
  res.end(`Post: ${pid}`);
}
```

## Catch All Routes

```js
// pages/api/post/[...slug].js

export default function handler(req, res) {
  const {slug} = req.query;
  res.end(`Post: ${slug.join(", ")}`);
}
```

## Optional Catch All Routes

```js
// [[...slug]].js
// index.js 없이도 catch 가능

// { } // GET `/api/post` (empty object)
// { "slug": ["a"] } // `GET /api/post/a` (single-element array)
// { "slug": ["a", "b"] } // `GET /api/post/a/b` (multi-element array)
```
