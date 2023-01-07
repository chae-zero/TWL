# Django REST Framework

[최소 3번 반복 시청](https://www.youtube.com/watch?v=cJveiktaOSQ)
[학습용 깃헙 코드](https://github.com/codingforentrepreneurs/Django-Rest-Framework-Tutorial)

```py
# settings.py
INSTALLED_APPS = [
    'rest_framework'
]
```

### serializers.py 사용

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

### Decorators, Response

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

### Detail page

```py
# urls.py
from drinks import views

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
