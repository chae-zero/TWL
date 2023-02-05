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
