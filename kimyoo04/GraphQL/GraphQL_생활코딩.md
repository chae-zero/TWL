# Graphql

### 스키마 예시

```js
type Topic {
  id: Int!
  title: String!
  body: String
}
type Query {
  title: String
  topics: [Topic]
  getTopic(id!: Int): Topic
}
type Mutation {
  createTopic(
    title: String!,
    body: String
  ): Topic
}
```

- 스키마: 서버와 클라이언트가 주고 받을 데이터의 형식을 정의한 약속이다.
- Schema Language: 스키마를 만드는 언어
- Query Language: 클라이언트가 서버에게 요청하는 언어
- type Query -> 브라우저가 서버한테 질의한다.
- 가장 Graphql endpoint를 알아야한다 (endpoint = API 접근할 수 있는 URL을 의미)
- ! 표현은 값이 필수라는 뜻
- type 안에 정의된 각각의 키?는 field라고 불린다.

### QUERY REQUEST

```js
endpoint = '/graphql';
queryCode = `
{
  title
}
`;
// queryCode를 필수로 query에 넣어주어야 함.
options = {
  method: 'post',
  headers: {'Content-Type':'application/json'}
  body: JSON.stringify({
    query: queryCode
  })
}
fetch(endpoint, options).then(type=> type.json()).then(result => console.log(result))

// -> 데이터 응답
// data: {
//   title: "egoing blog"
// }
```

```js
{
  title
  topics {
    id title
  }
}

// topics는 배열 타입이기 때문에 위처럼 사용
```

### 스키마에는 함수도 가능

```js
//
{
  title
  topics {
    id title body
  }
  getTopic(id:1) {id title}
}
```

### Query Variables Example

```js
// 함수안에 구체적인 id 값을 쿼리 랭귀지 안에 두는 것은 별로다 -> 가변처리
// Query Variables 따로 정의 필요
// 요청할 때 query 생략 가능, Query Variables의 타입이 필요할 땐 필수로 사용
// 타입 체킹 해줌

endpoint = '/graphql';
queryCode = `
qeury ($topicId:Int!) {
  title
  topics {
    id title body
  }
  getTopic(id:$topicId) {id title body}
}
`;
variables = {"topicId":1}

options = {
  method: 'post',
  headers: {'Content-Type':'application/json'}
  body: JSON.stringify({
    query: queryCode,
    variables:variables
  })
}
fetch(endpoint, options).then(type=> type.json()).then(result => console.log(result))
```

### MUTATION REQUEST

```js
mutation ($title:String!, $body:string) {
  createTopic(title:$title, body:$body) {
    id
  }
}
```

### MUTATION REQUEST Example

```js
endpoint = '/graphql';
queryCode = `
mutation ($title:String!, $body:string) {
  createTopic(title:$title, body:$body) {
    id
  }
}
`;
variables = {"title": prompt("타이틀 입력하세요."), "body": prompt("body?")}

options = {
  method: 'post',
  headers: {'Content-Type':'application/json'}
  body: JSON.stringify({
    query: queryCode,
    variables:variables
  })
}
fetch(endpoint, options).then(type=> type.json()).then(result => console.log(result))
```
