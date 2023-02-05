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
