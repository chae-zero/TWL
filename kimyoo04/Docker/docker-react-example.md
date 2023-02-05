## React + Docker (단일 컨테이너)

1. Dockerfile.dev 파일 생성
2. package.json 생성
3. docker build 실행

`docker build -f Dockerfile.dev -t yookim/sak-exhibition ./`

4. docker run 으로 실행 확인

- React 는 무조건 -it 옵션을 주어야함
- volume 설정 해줘야 실시간 업데이트가 됨 (node_modules 폴더 제외)

`docker run -it -p 3000:3000 -v /usr/src/app/node_modules -v %cd%:/usr/src/app yookim/sak-exhibition`

5. docker-compose.yml 파일 생성

```yml
# docker-compose 의 버전 정의
version: "3"
# 실행하려는 컨테이너들을 정의
services:
  # 컨테이너 이름
  react:
    # 현 디렉토리에 있는 Dockerfile 사용
    build:
      # 도커 이미지를 구성하기 위한 파일과 폴더들이 있는 위치
      context: .
      # 도커 파일 어떤 것인지 지정
      dockerfile: "Dockerfile.dev"
    # 해당 컨테이너의 포트 매핑
    ports:
      - "3000:3000"
    # 볼륨 설정
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    # 리액트 앱을 끌 때 필요 (버그를 없애기 위함)
    stdin_open: true
```

6. docker-compose로 실행

`docker-compose up`
`docker-compose up --build`

7. docker 환경에서 react app test

`docker run -it <이미지이름> npm run test`

8. docker-compose.yml 에 test 컨테이너 생성

```yml
services:
  # ...
  tests:
    context: .
    dockerfile: Dockerfile.dev
  volumes:
    - /usr/src/app/node_modules
    - ./:/usr/src/app
  command: ["npm", "run", "test"]
```

9. React 운영환경을 위한 nginx 이미지를 포함시키기

기존과 차이점

- react 를 통한 build 폴더를 nginx가 제공하기 때문에 먼저 npm run build 후 nginx 도커 이미지를 이용해서 시작

9-1. builder stage

```sh
# Dockerfile
FROM node:alpine as builder
WORKDIR '/usr/src/app'
COPY package.json
RUN npm install
COPY ./ ./
RUN npm run build
```

9-2. run stage

```sh
# Dockerfile
FROM nginx
EXPOSE 80
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
```

- --from=builder: 다른 stage 에 있는 파일을 복사할 때 Stage 이름을 명시
- /usr/share/nginx/html: dockerhub 공식 nginx 설명에는 이 디렉토리에 build 안의 파일들을 복사해줘야함
- EXPOSE 80: nginx가 80번 포트에서 켜지는 것을 포트 매핑 처리

10. docker build -t yookim/sak-exhibition:latest

11. docker run -p 8080:80 yookim/sak-exhibition:latest
