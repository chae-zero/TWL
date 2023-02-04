## docker-compose

- 다중 컨테이너 도커 애플리케이션을 정의하고 실행하기 위한 도구

### 컨테이너간 통신할 때의 에러

- 아무런 설정을 해주지 않으면 컨테이너 간에 바로 통신이 불가능하다.
- express 와 redis 를 사용할 때 redis 먼저 켜져야 한다.

-> docker compose를 사용하는 이유!

- 멀티 컨테이너 상황에서 쉽게 네트워크를 연결시켜주기 위해서 사용.

### docker-compose 사용법

```yml
# docker-compose 의 버전 정의
version: "3"
# 실행하려는 컨테이너들을 정의
services:
  # 컨테이너 이름
  redis-server:
    # 컨테이너에서 사용하는 이미지
    image: "redis"
  # 컨테이너 이름
  node-app:
    # 현 디렉토리에 있는 Dockerfile 을 읽어오기 위한 설정
    build: .
    # 포트 매핑 로컬 포트:컨테이너 포트
    ports:
      - "5000:8000"
```

### 한번에 컨테이너들을 실행하는 법

일반적인 방법: 이미지가 없을 때 이미지를 빌드하고 컨테이너 시작
(이미지가 기존에 있는 경우 그대로 이용)

- `docker-compose up`

다시 이미지를 무조건 빌드하여 컨테이너 시작

- `docker-compose up --build`

한번에 컨테이너들을 멈추는 방법

- `docker-compose down`

detach 옵션: 실행한 컨테이너들을 백그라운드에서 실행 (터미널 바로 사용하기 위해)

- `docker-compose up -d`
