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

### Model Serializer Create & Update Methods

```py
class ProjectSerializer(serializers.ModelSerializer):
    my_discount = serializers.SerializerMethodField(read_only=True)
    edit_url = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(
            view_name='project-detail',
            lookup_field='pk'
    )
    email = serializer.validated_data.pop('email')

    class Meta:
        model = Project
        fields = [
            'url',
            'edit_url',
            'email', # 추가
            'pk',
            'title',
            'content',
            'price',
            'sale_price',
            'my_discount',
        ]

    def create(self, validated_data):
        # return Project.objects.create(**validate_data)
        email = valiated_data.pop('email')
        obj = super().create(validated_data)
        print(email, obj)
        return obj
```
