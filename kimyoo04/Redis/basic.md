# Redis

Redis(REmote Dictionary Server)는 **메모리 기반**의 **키-값 구조 데이터 관리 시스템**이며, 모든 데이터를 메모리에 저장하고 빠르게 조회할 수 있는 비관계형 데이터베이스(**Nosql**)이다.

### 쓰는 이유

- 메모리를 사용하여 데이터를 불러올 때 빠르게 처리
- 데이터를 영속적으로도 보관
- 서버를 재부팅해도 데이터 유지

### express 와 함께 써보기

- redix-server 작동시키기
- redis 모듈 다운
- 레디스 클라이언트 생성 (redis.createClient({host, port}))
- redis server 가 작동하는 곳이 node.js 앱이 작동하는 곳과 다르면 host 키와 값, port 키와 값을 명시해야함. (각각의 컨테이너로 작업을 할 것이기 때문)
- docker-compose를 이용하기 때문에 host 옵션을 docker-compose.yml 파일에 명시한 컨테이너 이름으로 줄 것! (일반적인 경우는 redis server 주소를 준다)

```js
const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
  socket: {
    host: "redis-server",
    port: 6379,
  },
});

app.get("/", async (req, res) => {
  await client.connect();

  let number = await client.get("number");

  if (number === null) {
    number = 0;
  }

  console.log("Number: " + number);

  res.send("숫자가 1씩 올라갑니다. 숫자: " + number);
  await client.set("number", parseInt(number) + 1);
  await client.disconnect();
});

app.listen(8080);
console.log("Server is running");
```
