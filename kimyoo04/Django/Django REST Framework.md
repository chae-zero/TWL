# Django REST Framework

[최소 3번 반복 시청](https://www.youtube.com/watch?v=cJveiktaOSQ)
[학습용 깃헙 코드](https://github.com/codingforentrepreneurs/Django-Rest-Framework-Tutorial)

```py
# settings.py
INSTALLED_APPS = [
    'rest_framework'
]
```

### serializers.py 사용 (model serializers)

- serializers는 django에서 model_to_dict의 확장 버전이라 생각하면 좋다.
- model에서 받은 instance의 field 이름 혹은 값을 수정하거나, 기존 fields의 값을 활용해 새로운 field를 추가 가능
- 코드가 간결해며 model의 기능을 분리해줘서 좋음
- 한 개의 모델을 사용 목적에 맞게 여러 serializer로 구분하는 것도 좋은 방법
- 기존에 비해 보안 문제도 일부 해결해줌

```py
from rest_framework import serializers


class DrinkSerializer(serializers.ModelSerializer):
    # 메타데이터로, model 설명하는 곳
    # model의 결과를 api로 보내기 위한 용도 (파이썬 객체 -> JSON)
    class Meta:
        model = Drink
        fields = ['id', 'name', 'description']
```

```py
# views
from django.http import JsonResponse
from .model import Drink
from .serializers import DrinkSerializer

def drink_list(request):

    # get all the drinks
    # serialize them
    # return json
    drinks = Drink.objects.all()
    serializer = DrinkSerializer(drinks, many=True)
    return JsonResponse({"drink": serializer.data})

# urls.py
urlpatterns = [
    path('drink/', views.drink_list)
]

```

- is_valid(raise_exception=True) 메서드를 통한 편리한 에러 처리

```py
def api_home(request, *args, **kwargs):
    """
    DRF API View
    """
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        return Response(serializer.data)
    return Response({"invalid": "not good data"}, status=400)
```

### @api_view Decorator, Response

- Response()는 JSON 데이터만 보내주는 것이 아닌 rest_framework를 통해 만들어진 웹페이지에서 data를 편리하게 확인 가능

```py
# views.py
from django.http import JsonResponse
from .model import Drink
from .serializers import DrinkSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def drink_list(request):

    if request.method == 'GET'
        drinks = Drink.objects.all()
        serializer = DrinkSerializer(drinks, many=True)
        return JsonResponse({'drink': serializer.data})
    if request.method == 'POST'
        serializer = DrinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

```

### Detail page, Dynamic Routing

```py
# urls.py
from drinks import views

# <자료형:필드이름>
urlpatterns = [
    path('drink/<int:id>', views.drink_detail)
]

# views.py
@api_view(['GET', 'PUT', 'DELETE'])
def drink_detail(request):

    try:
        drink = Drink.objects.get(pk=id)
    except Drink.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DrinkSerializer(drink)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = DrinkSerializer(drink, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
      drink.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
```

### Get JSON through browser

```py
# urls.py
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
  path('admin/', admin.site.urls)
  # ...
]

urlpatterns = format_suffix_patterns(urlpatterns)

# views.py
# format 파라미터에 None을 주어야 url에서 .json을 붙였을 때 json만 받을 수 있음
def drink_list(request, format=None):
  drinks = Drink.objects.all()
  serializer = DrinkSerializer(drinks, many=True)
  return Response(serializer.data)
```

### @property Decorator

### @api_view and function based view

- this is confusing because of too many logics.
- but lt is useful when mixing many method or making CRUD all-in-one

```py
@api_view(['GET', 'POST'])
def product_alt_view(request, pk=None, *args, **kwargs):
    method = request.method

    if method == "GET":
        if pk is not None:
            # detail view
            # get_object_or_404 함수는 @api_view 데코레이터를 통해서 사용 가능해진다.
            # get_object_or_404 함수는 있으면 obj 반환 없으면 404 에러 페이지를 로드한다.
            obj = get_object_or_404(Product, pk=pk)
            data = ProductSerializer(obj, many=False).data
            return Response(data)
        # list view
        queryset = Product.objects.all()
        data = ProductSerializer(queryset, many=True).data
        return Response(data)

    if method == "POST":
        # create an item
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            title = serializer.validated_data.get('title')
            content = serializer.validated_data.get('content') or None
            if content is None:
                content = title
            serializer.save(content=content)
            return Response(serializer.data)
        return Response({"invalid": "not good data"}, status=400)
```

### Generics APIView

**generics.RetrieveAPIView**

```py
# views.py
class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# urls.py
urlpatterns = [
    path('<int:pk>', views.ProductDetailAPIViews.as_view())
]

# app/urls.py
urlpatterns = [
    path('api/products/', include('products.urls'))
]
```

**generics.CreateAPIView**

```py
# views.py
class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        title = serializer.validated_data.get('title')
        content = serializer.validated_data.get('content') or None
        if content is None:
            content = title
        serializer.save(content=content)

# urls.py
urlpatterns = [
    path('', views.ProductCreateAPIView.as_view())
]
```

**generics.ListAPIView**

- 사용안함

```py
# views.py
class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
```

**generics.ListCreateAPIView**

- GET, POST 요청 둘다 가능

```py
# views.py
class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
```

**generics.UpdateAPIView**
**generics.DeleteAPIView**

```py
# urls.py
urlpatterns = [
    path('<int:pk>/update/', views.ProductUpdateAPIView.as_view())
    path('<int:pk>/delete/', views.ProductDeleteAPIView.as_view())
]

# views.py
class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        instance = serializer.save()
        if not instance.content:
            instance.content = instance.title


class ProductDestroyAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        # instance
        super().perform_destroy(instance)
```

### mixins and Generic API View

- 유연성 부여, 직접 만드는 것을 고려한 방식
- GnericAPIView 앞에 상속을 받는다.
- mixins는 self.특정메소드를 사용할 수 있게 만들어준다. (공식문서 확인할 것)

**mixins.ListModeMixin**

```py
class ProjectMixinView(
    mixins.ListModeMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    # 클래스 기반 뷰의 메소드로 get은 get 요청을 위한 메소드이다. (post, put, patch, delete도 동일)
    # (함수 기반 뷰는 조건을 통한 메소드별 분기처리함)
    def get(self, request, *args, **kwargs): #HTTP -> Get
        # mixins.CreateModelMixin을 통해 self.list메소드 사용
        return self.list(request, *args, **kwargs)
```

**mixins.RetrieveModelMixin**

```py
class ProjectMixinView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'pk' # mixins.RetrieveModelMixin을 통해 lookup_field 값 사용

    def get(self, request, *args, **kwargs):
        print(args, kwargs)
        pk = kwargs.get('pk')

        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)
```

**mixins.CreateModelMixin**

```py
class ProjectMixinView(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        print(args, kwargs)
        pk = kwargs.get('pk')

        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # mixins.CreateModelMixin을 통해 self.create메소드 사용
        return self.create(request, *args, **kwargs)
```

**CreateAPIView, RetrieveAPIView, UpdateAPIView, ListAPIView, DestroyAPIView, ListCreateAPIView**

- 위에서 배운 기본적인 generics 뷰들은 mixins과 GenericAPIView가 합쳐진 것이다.
- 달리말하면 mixins는 위의 View 기능을 분리해서 소분해둔 클래스인 것이다.
- 그래서 mixins와 GenericAPIView를 상속받아서 원하는 방식대로 설계를 편리하게 할 수 있다.

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

### Users & Groups Permissions with DjangoModelPermissions

- admin 페이지에서 superuser 계정을 통해 user 생성
- 계정 수정 창에서 Permissions 칸에서 Staff status를 체크 유무로 staff 유무 조절
- 계정 수정 창에서 Groups 와 User Permissions에서 Chosen 창으로 추가하면 권한 추가됨
- Add Group 하면서 Available permissions에서 권한을 Chosen 창으로 추가하면 특정 권한을 가진 그룹이 생성됨 (유저가 그 그룹에 속하고 안속하게 하면서 권한 관리)
- permissions.DjangoModelPermissions 로 교체 (이것은 GET 요청을 제외하여 허가를 부여하기 때문에 GET 요청을 바꾸려면 custom 해야한다.)

### Custom Permission

- BlockListPermission 추가 가능 (아이피 추적후 blocklist에 있는 아이피를 차단하는 기능)
- IsOwnerOrReadOnly 추가 가능 (obj.owner == request.user 확인으로 수정, 삭제 권한 부여)

```py
# staff 계정의 권한을 조절하는 custom permission 클래스 정의 ()
class IsStaffEditorPermission(permissions.DjangoModelPermissions):
    # 아래와 같은 방식은 거의 필요없음. 가능하다는 것만 파악해둘 것
    def has_permission(self, request, view):
        user = request.user
        print(user.get_all_permissions()) # 유저의 권한 확인
        if user.is_staff:
            if user.has_perm('projects.add_project'): # 'app_name.verb_model_name'
                return True
            if user.has_perm('projects.delete_project'):
                return True
            if user.has_perm('projects.change_project'):
                return True
            if user.has_perm('projects.view_project'):
                return True
            return False
        return False
```

```py
class IsStaffEditorPermission(permissions.DjangoModelPermissions):
    # 아래와 같은 방식은 permissions.isAdminUser 와 거의 동일한 것임.
    def has_permissions(self, request, view):
        if not request.user.is_staff:
            return False
        return super().has_permission(request, view)
```

```py
# permissions.py 파일 새로 생성 (커스텀한 permissions 파일 -> permission_classes 변수에 리스트로 감싸서 넣어줄 것)
from rest_framework import permissions


# staff 계정의 권한을 조절하는 custom permission 클래스 정의 ()
class IsStaffEditorPermission(permissions.DjangoModelPermissions):
    # 실제 DjangoModelPermissions 의 코드를 보면 perms_map이 있음
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'], # GET은 빈 리스트인 것을 재정의
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

    def has_permissions(self, request, view):
        # 특정 유저 이름을 제외, 포함시키는 방법
        if not request.user.username == "adminname":
            return False
        # 특정 유저가 staff 유무 확인하는 방법
        if not request.user.is_staff:
            return False
        return super().has_permission(request, view)
```

```py
class ProjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authencation_classes = [authentication.SessionAuthentication]
    # perms_map 만 커스텀한 후 IsAdminUser와 같이 permission_classes에 저장
    permission_classes = [permissions.IsAdminUser, IsStaffEditorPermission]
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

### Using Mixins for Permissions

- 모든 클래스기반 뷰에 permission_classes를 재정의하기보다 mixin으로 permission_classes를 정의 후 mixin을 상속하는 것이 효율적임

```py
# api/mixins.py
from rest_framework import permissions
from .permissions import IsStaffEditorPermission

class StaffEditorPermissionMixin():
    permission_classes = [permissions.IsAdminUser, IsStaffEditorPermission]
```

### ViewSets & Routers

- view를 만든 후에 router를 통해서 자동으로 엔드포인트들을 생성해주는데 쓰지 말 것!
- 어느 뷰가 어느 엔드포인트로 가는지 직관적으로 보기 불편함
- express.js와 너무 다른 방식임 (기존 방식이 편함)

### Urls, Reaverse, Serializers
