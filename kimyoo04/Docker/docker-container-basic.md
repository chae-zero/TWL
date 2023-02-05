### 도커 컨테이너 실행

```sh
docker create <컨테이너 이미지 | 이름>

docker start <컨테이너 아이디 | 이름>

# -a 옵션: 해당 컨테이너 아이디를 실행이 될 때 붙어있는 상태에서 실행이 됐을 때의 아웃풋을 보여준다.
docker start -a <컨테이너 아이디 | 이름>

docker run <컨텐이너 이미지 | 이름>
```

### 도커 컨테이너 중지

```sh
# 하던 작업을 마저 한 후 컨테이너 중지 (Grace Period 정리하는 시간을 준다. sigterm 을 준 후 sigkill을 준다.)
docker stop <중지할 컨테이너 아이디 | 이름>

# 바로 sigkill을 주어 컨테이너 중지
docker kill <중지할 컨테이너 아이디 | 이름>
```

### 도커 컨테이너 삭제

```sh
# 기본 삭제
docker rm <삭제할 컨테이너 아이디 | 이름>

# 모든 컨테이너 삭제
docker rm `docker ps -a -p`

# 이미지 삭제
docker rmi <이미지 아이디>

# 한번에 컨테이너, 이미지, 네트워크 모드 삭제
docker system prune
```

### 실행중인 컨테이너 명령 전달

```sh
docker exec <컨테이너 아이디> 명령 # docker run <이미지 이름> ls와 동일

# exec 는 실행 중인 컨테이너에 명령을 전달하고 run 은 새로운 컨테이너를 만든후 명령을 전달한다.
```

```sh
# -it 옵션은 interactive terminal의 줄임말로 이 옵션이 없으면 실행후 컨테이너가 종료된다.
docker exec -it <컨테이너 아이디> 명령
```

### sh 를 통한 컨테이너 안의 쉘 환경 접근

```sh
docker exec -it <컨테이너 아이디> sh

# 예시
ls

touch new-file
ls

# 환경변수 생성
export hello=hi

# 출력
echo $hello
```

### Dockerfile 개발 환경과 운영 환경을 다르게 설정

`docker build -f Dockerfile.dev -t yookim/sak-exhibition ./`

- -f 옵션으로 Dockerfile을 직접 명시
