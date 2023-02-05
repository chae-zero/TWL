### Default DRF Settings

- 전체 API 에 적용할 Authencation, Permissions, throttle 등을 기본 값으로 넣어줄 수 있음
- 각각의 class-based view 에서 기본 값을 수정 가능 (필요한 곳만 수정하기 때문에 코드 반복 줄임)

```py
# settings.py

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication", # 패키지 경로 지정
        "api.authentication.TokenAuthentication" # 커스텀한 것은 파일 경로 지정
    ],
    "DEFAULT_PERMISSIONS_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly"
    ]
}
```
