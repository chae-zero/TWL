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
