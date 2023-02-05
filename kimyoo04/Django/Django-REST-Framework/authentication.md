### Session Authentication & Permissions

- generics 의 뷰들을 상속받았다면, permission_classes 변수에 리스트로 감싸서 permissions.IsAuthenicated 를 넣기
- permissions.IsAuthenicated 는 모든 요청을 로그인 요구
- permissions.IsAuthenicatedOrReadOnly 는 GET 요청을 제외한 로그인 요구
- authentication_classes 변수에 리스트로 감싸서 authentication 방식을 설정 (세션, 토큰, JWT 등)
- function-based view는 따로 데코레이터를 주는 방식을 사용한다.

```py
# views.py
from rest_framework import authentication, generics, mixins, permissions

class ProjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenicatedOrReadOnly]

    def perform_create(self, serializer):
        title = serializer.validated_data.get('title')
        content = serializer.validated_data.get('content') or None
        if content is None:
            content = title
        serializer.save(content=content)
```

### Token Authentication

- INSTALLED_APPS 에 'rest_framework.authtoken' 추가 -> python manage.py migrate 실행

```py
# project/urls.py
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('auth/', obtain_auth_token)
]

# views.py
class ProjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authencation_classes = [
        authentication.SessionAuthentication,
        authentication.TokenAuthentication
    ]
    # perms_map 만 커스텀한 후 IsAdminUser와 같이 permission_classes에 저장
    permission_classes = [permissions.IsAdminUser, IsStaffEditorPermission]
```

- json 형식으로 username 키와 값 password 키와 값을 주면 token 발급 -> token 값으로 요청 해더에 삽입으로 권한 부여 -> 원하는 요청 실행

```py
import requests

auth_response = requests.post(auth_endpoint, json={"username": username, "password": password})
print(auth_response.json())

if auth_response.status_code == 200:
    token = auth_response.json()['token']
    headers = {
        "Authorization": f'Bearer {token}' # Bearer를 keyword에 재정의 해야함 (기본은 Token)
    }

    get_response = requests.get(endpoint, headers=headers)
    print(get_response.json())

# authentication.py 파일 새로 생성
from rest_framework.authentication import TokenAuthentication as BaseTokenAuth

# keyword를 Bearer로 재정의 후 상속을 시키면 Bearer token 으로 인증 받도록 할 수 있음
class TokenAuthentication(BaseTkenAuth):
    keyword = 'Bearer'
```

**token expire 시키는 방법은 서드파티나 직접 커스텀해서 구현할 것**
