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

### Session Authentication & permissions
