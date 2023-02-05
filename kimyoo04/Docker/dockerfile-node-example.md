### package.json 파일과 server.js 파일 생성

```js
// server.js
const express = require("express");

// Constants
const PROT = 8080;
const HOST = `0,0,0,0`;

// App
const app = express();
app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

### 도커 파일 작성

- 개발 환경의 도커 파일, 운영 운영 환경의 도커 파일 두 개 필요
- dockerfile.dev

```dockerfile
FROM node:16-alpine

# 리액트, 노드 관련 파일들이 담길 경로
WORKDIR /usr/src/app

# package.json 파일을 현재 dockerfile이 있는 곳에서 WORKDIR 에 복사한다.
COPY package.json ./

# workdir에 복사한 package.json을 기준으로 npm install을 한다.
RUN npm install

# 전체 directory에 있는 파일들을 그대로 workdir 에 복사
COPY ./ ./

# react 실행 법
# CMD ["npm", "run", "start"]

# node 실행 법
CMD ["node", "server.js"]
```

### 포트 맵핑

- 컨테이너 상의 포트 번호와 컴퓨터 자체의 포트 번호를 연결해야함
- -p 옵션과 함께 로컬호스트의 포트번호와 컨테이너 안의 포트번호를 준다.
- `docker run -p 3000:8080 <이미지 주소>`

### 워킹 디렉토리(workdir)를 설정하는 이유

- COPY 를 할 때 기존에 있던 파일들이 디렉토리에서 복사해올 때 덮어씌워져서 문제가 생기는 경우가 있다.
- workdir이 없으면 base image와 다른 여러 파일들과 공존하면 ls를 했을 때 파악하기 불편하다

### -d 옵션

`docker run -d -p 5000:8080 yookim/sak-exhibition`

- -d 옵션은 detach 줄임말이며, docker run 후 터미널로 나오는 것임

### 소스 변경으로 빌드 하는 과정의 번거로움

- 소스 코드가 변경 될 때마다 이미지를 새로 빌드해야함

### 효율적인 재빌드 방법

- build 과정에서 npm install 할 때마다 다운을 받지 않도록 package.json 파일을 따로 먼저 COPY를 진행하여 npm install 할 때 불필요하게 다운받지 않고 캐싱된 것을 그대로 이용하도록 한다.

```dockerfile
# package.json 파일을 현재 dockerfile이 있는 곳에서 WORKDIR 에 복사한다.
COPY package.json ./

# workdir에 복사한 package.json을 기준으로 npm install을 한다.
RUN npm install

# 전체 directory에 있는 파일들을 그대로 workdir 에 복사
COPY ./ ./
```
