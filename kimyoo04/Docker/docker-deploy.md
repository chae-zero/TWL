```yml
deploy:
  # 외부 서비스 표시 (S3, elasticbeanstalk, firebase, ec2 등)
  provider: elasticbeanstalk

  # 현재 사용하고 있는 (AWS, Firebase 등)서비스가 위치하고 있는 물리적 장소
  region: "ap-northeast-2"

  # 생성된 어플리케이션의 이름
  app: "sak-exhibition"

  # 환경 이름
  env: "SakExhibition-env"

  # s3 서비스의 버켓 이름 (travis CI 에서 파일들을 압축 후 S3에 먼저 보낸 후 elasticbeanstalk 으로 보낸다)
  bucket_name: "elasticbeanstalk-ap-northeast- ~"

  on:
    # 어떤 브렌치에 PUSH 할 때 AWS에 배포를 할 것인지
    branch: main

  # IAM 설정
  access_key_id: $AWS_ACCESS_KEY
  secret_access_key: $AWS_SECRET_ACCESS_KEY
```
