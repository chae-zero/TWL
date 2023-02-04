## docker volume

- 도커 컨테이너에서 로컬의 레포지토리를 volume을 이용해 쳐다보면서 파일이 갱신될 때마다 mapping 한다.
- 다시 빌드하지 않아도 변경사항이 적용되게 한다.
- stop을 시켰다가 run 하면 된다.

```sh
# node_modules 폴더는 로컬에는 없기 때문에 맵핑을 하지 말라고 설정
# (pwd, print working directory <- 맥에서 경로설정법)
# (cd, current directory <- 윈도우 경로설정법)
docker run -d -p 5000:8080 -v /workdir/node_modules -v %cd%:/workdir <이미지 아이디>
```
