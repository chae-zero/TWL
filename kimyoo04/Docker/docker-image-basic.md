### 도커 이미지

- 도커 이미지 뜻?

  - 컨테이너를 만들기 위해 필요한 설정이나 종속성들을 갖고 있는 소프트웨어 페키지
  - 응용 프로그램을 실행하는 데 필요한 모든 것을 포함 (시작시 실행 될 명령어, 파일 스냅샷)

- 도커 허브에 이미 있는 것들을 가져와서 사용하거나, 직접 도커 이미지를 만들거나, 도커 이미지를 도커 허브에 공유할 수도 있다.

- 도커 이미지를 이용해서 도커 컨테이너 생성
  `docker create <이미지 이름>`

### 도커 이미지 실행

`docker run <이미지의 sha256 값 앞쪽만>`

### 도커 이미지 생성 순서

1. Dockerfile

- 도커 이미지를 만들기 위한 설정 파일. 컨테이너 행동 설정

2. 도커 클라이언트로 전달

- 도커 파일에 있는 명령들이 도커 클라이언트에 전달

3. 도커 서버로 전달

- 도터 클라이언트에 전달된 작업들을 하는 곳

4. 이미지 생성

### dockerfile 생성 순서

1. 베이스 이미지를 명시 (파일 스냅샷)
2. 추가적으로 필요한 파일을 다운 받기 위한 몇 가지 명령어를 명시 (파일 스냅샷)
3. 컨테이너 시작 시 실행될 명령어를 명시 (시작 시 실행될 명령어에 해당)

시작 시 실행할 명령어 = run <이미지 이름>
파일 스냅샷(베이스 이미지 + 추가적으로 필요한 파일들) = 해당 파일

### base image 란?

- 베이스 이미지는 이미지의 기반이 되는 부분
- 도커 이미지는 여러개의 레이어들로 되어 있다.
- 레이어는 중간 단계의 이미지
- 이미지(레이어, 레이어, 베이스이미지[쉽게 생각해서 OS 라고 생각하기])
  - 레이어들이 작동할 기반 이미지(OS 등등...)
- 레이어를 추가하면 이미지에 추가가 되며, 이를 레이어 케싱이라고 한다.

```dockerfile
# 베이스 이미지를 명시해준다.
# 이미지 생성시 기반이 되는 이미지 레이어
# <이미지 이름>:<테그> 형식으로 작성 ex)ubuntu:14.04

FROM baseImage

# 추가적으로 필요한 파일들을 다운로드 받는다.
# RUN - 도커 이미지가 생성되기 전에 수행할 쉘 명령어
RUN commnad

# 컨테이너 시작 시 실행 될 명령어를 명시해준다.
# 실행할 실행 파일 또는 쉘 스크립트
# CMD 는 dockerfile 안에 1회만 사용 가능
CMD ["executable"]
```

<!-- 초 간단 hello 출력용 도커 파일 만들기 -->

```dockerfile
FROM alpine

RUN command

CMD ["echo", "hello"]
```

### 도커 이미지 만들기

완성된 도커 파일로 어떻게 이미지를 생성하나?
도커 파일 -> 도커 클라이언트 -> 도커 서버 -> 이미지
도커 파일에 입력된 것들이 도커 클라이언트에 전달되어서 도커 서버가 인식하게 하여야한다.

- `docker build ./`

### build 과정 (도커 클라이언트 전달)

- 이미지 확인 및 불러오기
- **임시 컨테이너**를 하드디스크에 커널에 생성 ( 하드디스크에 파일 시스템 스냅샷 추가)
- **임시 컨테이너** 안에 시작시 실행할 명령어를 넣어줌
- 파일 시스템을 하드디스크에 넣어줌
- **임시 컨테이너**를 -> 원하는 이미지로 생성 (시작시 실행할 명령어와 파일 스냅숏 존재)

### 과정 집약

- 베이스 이미지에 다른 종속성이나 새로운 커맨드를 추가할 때는 **임시 컨테이너**를 만든 후 그 컨테이너를 토대로 **새로운 이미지를 만든다**. -> 그리고 **임시 컨테이너**는 지운다.
  (환경설정을 규격화하기 때문에 임시컨테이너를 만들어서 새로운 이미지를 만드는 것이다!?)

### 도커 이미지에 이름 주기

```sh
# 이름 규칙 -t 나의 도커 아이디 / 저장소 혹은 프로젝트 이름 : 버전
# -t : tagged 의 약자
docker build -t yookim/sak-exhibition:latest
```